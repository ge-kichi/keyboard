import BaseAccordions from "./BaseAccordions";
import BaseInputNumber from "./BaseInputNumber";
import { useSynthParams } from "../hooks";

function TheMenuOptions() {
  const { getParams, setParams } = useSynthParams();
  return (
    <BaseAccordions id="options" title="options" name="options">
      <BaseInputNumber
        id="detune"
        label="detune"
        value={getParams("detune")}
        onChange={(e: any) => setParams("detune", e.target.value)}
      />
      <BaseInputNumber
        id="portamento"
        label="portamento"
        min="0"
        value={getParams("portamento")}
        onChange={(e: any) => setParams("portamento", e.target.value)}
      />
      <BaseInputNumber
        id="volume"
        label="volume"
        value={getParams("volume")}
        onChange={(e: any) => setParams("volume", e.target.value)}
      />
    </BaseAccordions>
  );
}

export default TheMenuOptions;
