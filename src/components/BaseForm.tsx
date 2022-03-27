import { FC, Children } from "react";

type BaseFormProps = {};

const BaseForm: FC<BaseFormProps> = ({ children }) => {
  const [LabelComponent, InputComponent] = Children.toArray(children);
  return (
    <div className="el-cluster el-cluster--justify:flex-start el-cluster--space:0">
      <div style={{ width: "95px" }}>{LabelComponent}</div>
      <div>{InputComponent}</div>
    </div>
  );
};

export default BaseForm;
