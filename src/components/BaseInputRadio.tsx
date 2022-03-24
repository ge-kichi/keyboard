import { ReactNode, Children } from "react";
import BaseForm from "./BaseForm";

function BaseInputRadio(props: {
  label: string;
  name: string;
  value: string;
  children: ReactNode;
  onChange: (e: any) => void;
}) {
  return (
    <BaseForm>
      <label className="form-label">{props.label}</label>
      <>
        {Children.map(props.children, (child, i) => (
          <label className="form-radio form-inline" key={i}>
            <input
              type="radio"
              name={props.name}
              value={child as string}
              checked={child === props.value}
              onChange={props.onChange}
            />
            <i className="form-icon"></i>
            {child}
          </label>
        ))}
      </>
    </BaseForm>
  );
}
export default BaseInputRadio;
