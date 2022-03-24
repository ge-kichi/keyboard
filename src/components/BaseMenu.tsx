import { ReactNode, Children, CSSProperties } from "react";

function BaseMenu(props: { children: ReactNode; contentName?: string }) {
  return (
    <ul className="menu">
      <div
        className="tile tile-centered"
        style={
          {
            marginBottom: "var(--ms-1)",
          } as CSSProperties
        }
      >
        <div className="tile-content">
          <div className="tile-title">{props.contentName}</div>
        </div>
      </div>
      {Children.map(props.children, (child, i) => (
        <li className="menu-item" key={i}>
          {child}
        </li>
      ))}
    </ul>
  );
}

export default BaseMenu;
