import TheMenuOptions from "./TheMenuOptions";
import TheMenuOscillator from "./TheMenuOscillator";
import TheMenuEnvelope from "./TheMenuEnvelope";

function TheMenu() {
  return (
    <div className="el-center">
      <TheMenuOptions />
      <TheMenuOscillator />
      <TheMenuEnvelope />
    </div>
  );
}

export default TheMenu;
