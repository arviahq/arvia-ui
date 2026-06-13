import type { ReactNode } from "react";
import { Prose } from "../site.arv";

export function DocProse(props: { children: ReactNode }) {
  const prose = Prose();
  return <div className={prose.root}>{props.children}</div>;
}

export function DocH2(props: { children: ReactNode }) {
  const prose = Prose();
  return <h2 className={prose.h2}>{props.children}</h2>;
}

export function DocH3(props: { children: ReactNode }) {
  const prose = Prose();
  return <h3 className={prose.h3}>{props.children}</h3>;
}

export function DocP(props: { children: ReactNode }) {
  const prose = Prose();
  return <p className={prose.p}>{props.children}</p>;
}

export function DocUl(props: { children: ReactNode }) {
  const prose = Prose();
  return <ul className={prose.ul}>{props.children}</ul>;
}

export function DocLi(props: { children: ReactNode }) {
  const prose = Prose();
  return <li className={prose.li}>{props.children}</li>;
}

export function DocCode(props: { children: ReactNode }) {
  const prose = Prose();
  return <code className={prose.code}>{props.children}</code>;
}

export function DocPre(props: { children: string }) {
  const prose = Prose();
  return <pre className={prose.pre}>{props.children}</pre>;
}
