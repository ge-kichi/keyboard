import { ReactNode, Children } from "react";
import BaseForm from "./BaseForm";

function BaseSelect(props: { label: string; id: string; children: ReactNode }) {
  return (
    <BaseForm>
      <label className="form-label" htmlFor={props.id}>
        {props.label}
      </label>
      <select id={props.id} className="form-select">
        {Children.map(props.children, (child, i) => (
          <option key={i}>{child}</option>
        ))}
      </select>
    </BaseForm>
  );
}
export default BaseSelect;
