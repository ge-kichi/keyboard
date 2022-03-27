import BaseAccordions from "./BaseAccordions";
import BaseInputNumber from "./BaseInputNumber";
import BaseSelect from "./BaseSelect";
import { useSynthParams } from "../hooks";

function TheMenuOscillator() {
  const { getParams, setParams } = useSynthParams();
  return (
    <BaseAccordions id="oscillator" title="oscillator" name="oscillator">
      <BaseSelect
        id="type"
        label="type"
        value={getParams("type")}
        onChange={(e: any) => setParams("type", e.target.value)}
      >
        {["sine", "square", "sawtooth", "triangle"]}
      </BaseSelect>
      <BaseInputNumber
        id="partialCount"
        label="partialCount"
        min="0"
        step="1"
        value={getParams("partialCount")}
        onChange={(e: any) => setParams("partialCount", e.target.value)}
      />
      <BaseInputNumber
        id="phase"
        label="phase"
        min="0"
        step="0.1"
        value={getParams("phase")}
        onChange={(e: any) => setParams("phase", e.target.value)}
      />
    </BaseAccordions>
  );
}

export default TheMenuOscillator;
