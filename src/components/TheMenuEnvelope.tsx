import BaseAccordions from "./BaseAccordions";
import BaseInputNumber from "./BaseInputNumber";
import BaseInputRadio from "./BaseInputRadio";
import { useSynthParams } from "../hooks";

const curves = ["linear", "exponential"];

function TheMenuEnvelope() {
  const { getParams, setParams } = useSynthParams();
  return (
    <BaseAccordions id="envelope" title="envelope" name="envelope">
      <BaseInputNumber
        id="attack"
        label="attack"
        min="0"
        step="0.001"
        value={getParams("attack")}
        onChange={(e: any) => setParams("attack", e.target.value)}
      />
      <BaseInputRadio
        label="attackCurve"
        name="attackCurve"
        value={getParams("attackCurve")}
        onChange={(e: any) => setParams("attackCurve", e.target.value)}
      >
        {curves}
      </BaseInputRadio>
      <BaseInputNumber
        id="decay"
        label="decay"
        min="0"
        step="0.001"
        value={getParams("decay")}
        onChange={(e: any) => setParams("decay", e.target.value)}
      />
      <BaseInputRadio
        label="decayCurve"
        name="decayCurve"
        value={getParams("decayCurve")}
        onChange={(e: any) => setParams("decayCurve", e.target.value)}
      >
        {curves}
      </BaseInputRadio>
      <BaseInputNumber
        id="release"
        label="release"
        min="0"
        step="0.001"
        value={getParams("release")}
        onChange={(e: any) => setParams("release", e.target.value)}
      />
      <BaseInputRadio
        label="releaseCurve"
        name="releaseCurve"
        value={getParams("releaseCurve")}
        onChange={(e: any) => setParams("releaseCurve", e.target.value)}
      >
        {curves}
      </BaseInputRadio>
      <BaseInputNumber
        id="sustain"
        label="sustain"
        min="0.1"
        max="1"
        step="0.001"
        value={getParams("sustain")}
        onChange={(e: any) => setParams("sustain", e.target.value)}
      />
    </BaseAccordions>
  );
}

export default TheMenuEnvelope;
