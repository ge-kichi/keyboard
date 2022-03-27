import TheMenuOptions from "./TheMenuOptions";
import TheMenuOscillator from "./TheMenuOscillator";
import TheMenuEnvelope from "./TheMenuEnvelope";

function TheMenu() {
  return (
    <div
      className="el-box el-box--padding:ms5"
      style={{ paddingTop: 0, paddingBottom: 0 }}
    >
      <TheMenuOptions />
      <TheMenuOscillator />
      <TheMenuEnvelope />
    </div>
  );
}

export default TheMenu;
