import { ReactNode, Children } from "react";
import BaseForm from "./BaseForm";

function BaseSelect(props: {
  label: string;
  id: string;
  children: ReactNode;
  value: string;
  onChange: (e: any) => void;
}) {
  return (
    <BaseForm>
      <label className="form-label" htmlFor={props.id}>
        {props.label}
      </label>
      <select
        id={props.id}
        className="form-select"
        value={props.value}
        onChange={props.onChange}
      >
        {Children.map(props.children, (child, i) => (
          <option key={i} value={child as string}>
            {child}
          </option>
        ))}
      </select>
    </BaseForm>
  );
}
export default BaseSelect;
