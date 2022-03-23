import { ReactNode, Children } from "react";

function BaseMenu(props: { children: ReactNode; contentName?: string }) {
  return (
    <ul className="menu el-stack">
      {props.contentName ? (
        <li className="divider" data-content={props.contentName}></li>
      ) : (
        ""
      )}
      {/* <li className="divider" data-content="LINKS"></li> */}
      {Children.map(props.children, (child, i) => (
        <li className="menu-item" key={i}>
          {child}
        </li>
      ))}
    </ul>
  );
}

export default BaseMenu;
