import { DocHeader } from "./DocsShell";
import { DocH2, DocP, DocPre, DocProse } from "./DocProse";
import { LivePreview } from "./LivePreview";
import { PropsTable } from "./PropsTable";
import { Controls } from "./Controls";
import type { ComponentDoc } from "../docs/components/types";

export function ComponentDocPage(props: { doc: ComponentDoc }) {
  const { doc } = props;
  const Preview = doc.Preview;
  const Examples = doc.Examples;

  return (
    <DocProse>
      <DocHeader title={doc.title} description={doc.description} />

      {doc.playground ? (
        <>
          <DocH2>Playground</DocH2>
          <DocP>Tweak the props below — the preview and code update live.</DocP>
          <Controls importName={doc.importName} propDefs={doc.props} playground={doc.playground} />
        </>
      ) : (
        <>
          <DocH2>Preview</DocH2>
          <LivePreview>
            <Preview />
          </LivePreview>
        </>
      )}

      {Examples ? (
        <>
          <DocH2>Examples</DocH2>
          <Examples />
        </>
      ) : null}

      <PropsTable rows={doc.props} />

      <DocH2>Usage</DocH2>
      <DocPre>{doc.usage}</DocPre>
    </DocProse>
  );
}
