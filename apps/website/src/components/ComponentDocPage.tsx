import { DocHeader } from "./DocsShell";
import { DocH2, DocP, DocPre, DocProse } from "./DocProse";
import { LivePreview } from "./LivePreview";
import { PropsTable } from "./PropsTable";
import type { ComponentDoc } from "../docs/components/types";

export function ComponentDocPage(props: { doc: ComponentDoc }) {
  const { doc } = props;
  const Preview = doc.Preview;
  const Examples = doc.Examples;

  return (
    <DocProse>
      <DocHeader title={doc.title} description={doc.description} />

      <DocH2>Preview</DocH2>
      <LivePreview>
        <Preview />
      </LivePreview>

      {Examples ? (
        <>
          <DocH2>Examples</DocH2>
          <Examples />
        </>
      ) : null}

      <DocH2>Props</DocH2>
      <DocP>All variant props are typed string unions — pass them as strings, not numbers.</DocP>
      <PropsTable rows={doc.props} />

      <DocH2>Usage</DocH2>
      <DocPre>{doc.usage}</DocPre>
    </DocProse>
  );
}
