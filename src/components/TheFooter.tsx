import BaseLink from "./BaseLink";

function TheFooter() {
  return (
    <div className="the-footer-child el-center">
      <small className="the-footer-child__container">
        <BaseLink url="https://github.com/l1ck0h/keyboard" label="GitHub" /> /
        &copy; 2022 l1ck0h
      </small>
    </div>
  );
}

export default TheFooter;
