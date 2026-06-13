import { PropsTable as propsTableStyles } from "../site.arv";
import type { PropDefinition } from "../docs/components/types";

export function PropsTable(props: { rows: PropDefinition[] }) {
  const table = propsTableStyles();

  return (
    <table className={table.root}>
      <thead>
        <tr>
          <th className={table.th}>Prop</th>
          <th className={table.th}>Type</th>
          <th className={table.th}>Default</th>
          <th className={table.th}>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row) => (
          <tr key={row.name}>
            <td className={table.td}>
              <span className={table.propName}>{row.name}</span>
            </td>
            <td className={table.td}>
              <span className={table.typeCell}>{row.type}</span>
            </td>
            <td className={table.td}>
              {row.default ? <code className={table.code}>{row.default}</code> : "—"}
            </td>
            <td className={table.td}>{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
