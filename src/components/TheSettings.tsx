import BaseInputNumber from "./BaseInputNumber";
import BaseInputRadio from "./BaseInputRadio";
import BaseMenu from "./BaseMenu";
import BaseSelect from "./BaseSelect";
import ThePlayer from "./ThePlayer";
import { useSynthParams } from "../hooks";

function TheSettings() {
  const { getParams, setParams } = useSynthParams();
  return (
    <div className="el-grid">
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "space-between",
        }}
      >
        <BaseMenu contentName="options">
          <BaseInputNumber
            label="detune"
            id="detune"
            value={getParams("detune")}
            onChange={(e: any) => setParams("detune", e.target.value)}
          />
          <BaseInputNumber
            label="portamento"
            id="portamento"
            min="0"
            value={getParams("portamento")}
            onChange={(e: any) => setParams("portamento", e.target.value)}
          />
          <BaseInputNumber
            label="volume"
            id="volume"
            value={getParams("volume")}
            onChange={(e: any) => setParams("volume", e.target.value)}
          />
        </BaseMenu>
        <BaseMenu contentName="player">
          <ThePlayer />
        </BaseMenu>
      </div>
      <BaseMenu contentName="ocillator">
        <BaseSelect
          label="type"
          id="type"
          value={getParams("type")}
          onChange={(e: any) => setParams("type", e.target.value)}
        >
          {["sine", "square", "sawtooth", "triangle"]}
        </BaseSelect>
        <BaseInputNumber
          label="partialCount"
          id="partialCount"
          min="0"
          step="1"
          value={getParams("partialCount")}
          onChange={(e: any) => setParams("partialCount", e.target.value)}
        />
        <BaseInputNumber
          label="phase"
          id="phase"
          min="0"
          step="0.1"
          value={getParams("phase")}
          onChange={(e: any) => setParams("phase", e.target.value)}
        />
      </BaseMenu>
      <BaseMenu contentName="envelope">
        <BaseInputNumber
          label="attack"
          id="attack"
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
          {["linear", "exponential"]}
        </BaseInputRadio>
        <BaseInputNumber
          label="decay"
          id="decay"
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
          {["linear", "exponential"]}
        </BaseInputRadio>
        <BaseInputNumber
          label="release"
          id="release"
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
          {["linear", "exponential"]}
        </BaseInputRadio>
        <BaseInputNumber
          label="sustain"
          id="sustain"
          min="0.1"
          max="1"
          step="0.001"
          value={getParams("sustain")}
          onChange={(e: any) => setParams("sustain", e.target.value)}
        />
      </BaseMenu>
    </div>
  );
}

export default TheSettings;
