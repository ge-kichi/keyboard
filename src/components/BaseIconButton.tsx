import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BasePlayPauseButton(props: {
  iconProp: IconProp;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) {
  return (
    <button
      className="btn btn-action s-circle"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <FontAwesomeIcon icon={props.iconProp} />
    </button>
  );
}

export default BasePlayPauseButton;
