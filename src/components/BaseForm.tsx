import { ReactNode, Children } from "react";

function BaseForm(props: { children: ReactNode }) {
  const [LabelComponent, InputComponent] = Children.toArray(props.children);
  return (
    <div className="el-cluster el-cluster--justify:space-between el-cluster--space:0">
      <div style={{ width: "91px" }}>{LabelComponent}</div>
      <div>{InputComponent}</div>
    </div>
  );
}

export default BaseForm;
