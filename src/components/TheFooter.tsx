import BaseLink from "./BaseLink";

function TheFooter() {
  return (
    <footer
      className="el-center"
      style={{ position: "sticky", top: "100vh", marginTop: 0 }}
    >
      <small>
        <BaseLink url="https://github.com/l1ck0h/keyboard" label="GitHub" /> /
        &copy; 2022 l1ck0h
      </small>
    </footer>
  );
}

export default TheFooter;
