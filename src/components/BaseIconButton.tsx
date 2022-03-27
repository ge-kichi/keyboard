import { FC, MouseEventHandler } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type BaseIconButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  iconProp: IconProp;
};

const BaseIconButton: FC<BaseIconButtonProps> = ({
  onClick,
  disabled,
  iconProp,
}) => (
  <button
    className="btn btn-action s-circle"
    onClick={onClick}
    disabled={disabled}
  >
    <FontAwesomeIcon icon={iconProp} />
  </button>
);

export default BaseIconButton;
