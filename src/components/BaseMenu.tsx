import { FC, Children, CSSProperties } from "react";

type BaseMenuProps = { contentName: string };

const BaseMenu: FC<BaseMenuProps> = ({ contentName, children }) => (
  <ul className="menu">
    <li
      className="tile tile-centered"
      style={
        {
          marginBottom: "var(--ms-1)",
        } as CSSProperties
      }
    >
      <div className="tile-content">
        <div className="tile-title">{contentName}</div>
      </div>
    </li>
    {Children.map(children, (child, i) => (
      <li className="menu-item" key={i}>
        {child}
      </li>
    ))}
  </ul>
);

export default BaseMenu;
