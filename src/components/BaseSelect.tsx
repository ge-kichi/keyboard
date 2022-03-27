import { FC, Children } from "react";
import BaseForm from "./BaseForm";

type BaseSelectProps = {
  id: string;
  label: string;
  onChange: (e: any) => void;
  value: string;
};

const BaseSelect: FC<BaseSelectProps> = ({
  id,
  label,
  onChange,
  children,
  value,
}) => (
  <BaseForm>
    <label className="form-label" htmlFor={id}>
      {label}
    </label>
    <select id={id} className="form-select" value={value} onChange={onChange}>
      {Children.map(children, (child, i) => (
        <option key={i} value={child as string}>
          {child}
        </option>
      ))}
    </select>
  </BaseForm>
);

export default BaseSelect;
