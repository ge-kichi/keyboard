import { ReactNode, Children } from "react";
import BaseForm from "./BaseForm";

function BaseInputRadio(props: {
  label: string;
  name: string;
  children: ReactNode;
}) {
  return (
    <BaseForm>
      <label className="form-label">{props.label}</label>
      <>
        {Children.map(props.children, (child, i) => (
          <label className="form-radio form-inline" key={i}>
            <input type="radio" name={props.name} checked />
            <i className="form-icon"></i>
            {child}
          </label>
        ))}
      </>
    </BaseForm>
  );
}
export default BaseInputRadio;
