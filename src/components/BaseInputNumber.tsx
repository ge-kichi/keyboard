import BaseForm from "./BaseForm";

function BaseInputNumber(props: {
  label: string;
  id: string;
  min?: string;
  max?: string;
  step?: string;
  value: string;
  onChange: (e: any) => void;
}) {
  return (
    <BaseForm>
      <label className="form-label" htmlFor={props.label}>
        {props.label}
      </label>
      <input
        type="number"
        id={props.label}
        className="form-input"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={props.onChange}
      />
    </BaseForm>
  );
}

export default BaseInputNumber;
