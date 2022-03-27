import { FC } from "react";
import BaseForm from "./BaseForm";

type BaseInputNumberProps = {
  id: string;
  label: string;
  min?: string;
  max?: string;
  step?: string;
  value: string;
  onChange: (e: any) => void;
};

const BaseInputNumber: FC<BaseInputNumberProps> = ({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
}) => (
  <BaseForm>
    <label className="form-label" htmlFor={id}>
      {label}
    </label>
    <input
      type="number"
      id={id}
      className="form-input"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
    />
  </BaseForm>
);

export default BaseInputNumber;
