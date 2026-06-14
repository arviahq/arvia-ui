/**
 * Pre-compiles the @arvia-ui/core-styles `.arv` sources into the build artifacts that
 * `@arvia-ui/react` ships:
 *
 *   generated/<name>.mjs   class-name maps imported by the React wrappers
 *   generated/<name>.d.ts  prop/variant types for those wrappers
 *   generated/styles.css   one bundled stylesheet (theme first, then components)
 *
 * Because this runs at publish time, the published package contains only plain
 * JS + CSS — consumers need no Arvia compiler, Vite plugin, or build config.
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const require = createRequire(import.meta.url);

const stylesRoot = path.resolve(packageRoot, "../core-styles/src");
const themePath = path.join(stylesRoot, "theme.arv");
const componentsDir = path.join(stylesRoot, "components");
const outDir = path.join(packageRoot, "generated");

/** Resolve `compile` from the published compiler, falling back to the sibling repo. */
async function loadCompile() {
  const candidates = [
    () => require("@arviahq/compiler").compile,
    async () => {
      const local = path.resolve(packageRoot, "../../../arvia/packages/compiler/dist/index.mjs");
      const mod = await import(pathToFileURL(local).href);
      return mod.compile;
    },
  ];

  for (const load of candidates) {
    try {
      const compile = await load();
      if (typeof compile === "function") return compile;
    } catch {
      // try the next resolver
    }
  }

  throw new Error(
    "Cannot find @arviahq/compiler. Run `pnpm install` from the repo root, or build the sibling arvia repo.",
  );
}

/** Compile one `.arv` file, aborting the build on any error diagnostic. */
function compileFile(compile, filePath, options) {
  const source = fs.readFileSync(filePath, "utf8");
  const result = compile(source, {
    filename: filePath,
    root: stylesRoot,
    minify: true,
    ...options,
  });

  const errors = result.diagnostics.filter((d) => d.severity === "error");
  if (errors.length > 0) {
    console.error(`Failed to compile ${path.relative(packageRoot, filePath)}`);
    for (const d of errors) console.error(`  ${d.message}`);
    process.exit(1);
  }

  return result;
}

function writeGenerated(name, { js, dts }) {
  const base = path.join(outDir, name);
  fs.writeFileSync(`${base}.mjs`, js ?? "");
  if (dts) fs.writeFileSync(`${base}.d.ts`, dts);
}

const compile = await loadCompile();

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

// The theme defines shared tokens + recipes; its env is threaded into every component.
const theme = compileFile(compile, themePath, { sharedEnvFile: true });
writeGenerated("theme", theme);
let css = theme.css ?? "";

const componentFiles = fs
  .readdirSync(componentsDir)
  .filter((f) => f.endsWith(".arv"))
  .sort();

for (const file of componentFiles) {
  const name = path.basename(file, ".arv");
  const result = compileFile(compile, path.join(componentsDir, file), { env: theme.env });
  writeGenerated(name, result);
  css += result.css ?? "";
  console.log(`compiled ${name}.arv`);
}

fs.writeFileSync(path.join(outDir, "styles.css"), css);
console.log(`wrote generated/styles.css (${css.length} bytes)`);
