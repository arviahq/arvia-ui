import { useEffect, useRef } from "react";

type Rgb = [number, number, number];

function readVar(name: string, fallback: Rgb): Rgb {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (raw.startsWith("#") && raw.length >= 7) {
    return [
      parseInt(raw.slice(1, 3), 16),
      parseInt(raw.slice(3, 5), 16),
      parseInt(raw.slice(5, 7), 16),
    ];
  }
  return fallback;
}

const RIBBONS = [
  { y: 0.34, amp: 0.06, wavelength: 1.15, thickness: 0.16, speed: 0.18, phase: 0.0 },
  { y: 0.52, amp: 0.08, wavelength: 0.85, thickness: 0.2, speed: 0.13, phase: 2.1 },
  { y: 0.66, amp: 0.05, wavelength: 1.4, thickness: 0.14, speed: 0.22, phase: 4.3 },
];

/**
 * Original animated hero backdrop for arvia-ui: undulating "aurora" ribbons over a
 * drifting dot grid, with a roaming radial glow and a vignette that fades into the
 * page background so foreground text stays legible. Tinted by --arvia-color-accent
 * and re-themed when data-arvia-theme flips. Honors prefers-reduced-motion.
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let raf = 0;

    let accent: Rgb = [79, 70, 229];
    let bg: Rgb = [244, 244, 245];
    let dark = false;

    const readTheme = () => {
      accent = readVar("--arvia-color-accent", [79, 70, 229]);
      bg = readVar("--arvia-color-background", [244, 244, 245]);
      dark = document.documentElement.getAttribute("data-arvia-theme") === "dark";
    };

    const rgba = (c: Rgb, a: number) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawDots = (t: number) => {
      const spacing = 34;
      const ox = (Math.sin(t * 0.1) * 10 + t * 4) % spacing;
      const oy = (Math.cos(t * 0.08) * 8) % spacing;
      ctx.fillStyle = rgba(accent, dark ? 0.16 : 0.1);
      for (let x = -spacing; x < width + spacing; x += spacing) {
        for (let y = -spacing; y < height + spacing; y += spacing) {
          ctx.beginPath();
          ctx.arc(x + ox, y + oy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawGlow = (t: number) => {
      const cx = (0.5 + Math.sin(t * 0.12) * 0.28) * width;
      const cy = (0.3 + Math.cos(t * 0.09) * 0.16) * height;
      const r = Math.max(width, height) * 0.5;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, rgba(accent, dark ? 0.32 : 0.2));
      g.addColorStop(0.5, rgba(accent, dark ? 0.1 : 0.07));
      g.addColorStop(1, rgba(accent, 0));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    };

    const drawRibbon = (r: (typeof RIBBONS)[number], t: number) => {
      const step = Math.max(8, width / 64);
      const baseY = r.y * height;
      const amp = r.amp * height;
      const thickness = r.thickness * height;
      const k = (Math.PI * 2 * r.wavelength) / width;

      const edge = (offset: number, x: number) =>
        baseY + offset + Math.sin(x * k + t * r.speed + r.phase) * amp;

      ctx.beginPath();
      ctx.moveTo(0, edge(-thickness / 2, 0));
      for (let x = step; x <= width; x += step) ctx.lineTo(x, edge(-thickness / 2, x));
      for (let x = width; x >= 0; x -= step) ctx.lineTo(x, edge(thickness / 2, x));
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, 0, width, 0);
      const peak = dark ? 0.22 : 0.14;
      grad.addColorStop(0, rgba(accent, 0));
      grad.addColorStop(0.5, rgba(accent, peak));
      grad.addColorStop(1, rgba(accent, 0));
      ctx.fillStyle = grad;
      ctx.fill();
    };

    const drawVignette = () => {
      const g = ctx.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, rgba(bg, 0));
      g.addColorStop(0.55, rgba(bg, 0.25));
      g.addColorStop(1, rgba(bg, 1));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    };

    const paint = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      drawDots(t);
      drawGlow(t);
      const prev = ctx.globalCompositeOperation;
      ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
      for (const r of RIBBONS) drawRibbon(r, t);
      ctx.globalCompositeOperation = prev;
      drawVignette();
    };

    const loop = () => {
      frame += 0.016;
      paint(frame);
      raf = requestAnimationFrame(loop);
    };

    readTheme();
    resize();
    paint(0);
    if (!reducedMotion) loop();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const mo = new MutationObserver(() => {
      readTheme();
      paint(frame);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-arvia-theme"] });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}
