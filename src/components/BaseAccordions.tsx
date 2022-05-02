import { FC } from "react";

type BaseAccordionsProps = {
  id: string;
  name: string;
  title: string;
};

const BaseAccordions: FC<BaseAccordionsProps> = ({
  id,
  name,
  title,
  children,
}) => (
  <div className="accordion">
    <input type="checkbox" id={id} name={name} hidden></input>
    <label className="accordion-header" htmlFor={id}>
      <i className="icon icon-arrow-right mr-1"></i>
      {title}
    </label>
    <div className="accordion-body">{children}</div>
  </div>
);

export default BaseAccordions;
