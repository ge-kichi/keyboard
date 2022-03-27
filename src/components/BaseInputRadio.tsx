import { FC, Children } from "react";
import BaseForm from "./BaseForm";

type BaseInputRadioProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
};

const BaseInputRadio: FC<BaseInputRadioProps> = ({
  label,
  name,
  value,
  children,
  onChange,
}) => (
  <BaseForm>
    <label className="form-label">{label}</label>
    <>
      {Children.map(children, (child, i) => (
        <label className="form-radio form-inline" key={i}>
          <input
            type="radio"
            name={name}
            value={child as string}
            checked={child === value}
            onChange={onChange}
          />
          <i className="form-icon"></i>
          {child}
        </label>
      ))}
    </>
  </BaseForm>
);

export default BaseInputRadio;
