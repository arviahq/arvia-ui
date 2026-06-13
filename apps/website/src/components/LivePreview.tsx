import type { ReactNode } from "react";
import { DemoPanel } from "../site.arv";

export function LivePreview(props: { label?: string; children: ReactNode }) {
  const panel = DemoPanel();
  return (
    <div className={panel.root}>
      {props.label ? <span className={panel.label}>{props.label}</span> : null}
      <div className={panel.preview}>{props.children}</div>
    </div>
  );
}
