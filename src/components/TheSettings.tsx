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
        <BaseSelect label="type" id="type">
          {["Choose a type", "Slack", "Skype", "Hipchat"]}
        </BaseSelect>
        <BaseInputNumber
          label="partialCount"
          id="partialCount"
          min="0"
          step="0.1"
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
          step="0.1"
          value={getParams("attack")}
          onChange={(e: any) => setParams("attack", e.target.value)}
        />
        <BaseInputRadio label="attackCurve" name="attackCurve">
          {["linear", "exponential"]}
        </BaseInputRadio>
        <BaseInputNumber
          label="decay"
          id="decay"
          min="0"
          step="0.1"
          value={getParams("decay")}
          onChange={(e: any) => setParams("decay", e.target.value)}
        />
        <BaseInputRadio label="decayCurve" name="decayCurve">
          {["linear", "exponential"]}
        </BaseInputRadio>
        <BaseInputNumber
          label="release"
          id="release"
          min="0"
          step="0.1"
          value={getParams("release")}
          onChange={(e: any) => setParams("release", e.target.value)}
        />
        <BaseInputRadio label="releaseCurve" name="releaseCurve">
          {["linear", "exponential"]}
        </BaseInputRadio>
        <BaseInputNumber
          label="sustain"
          id="sustain"
          min="0.1"
          max="1"
          step="0.1"
          value={getParams("sustain")}
          onChange={(e: any) => setParams("sustain", e.target.value)}
        />
      </BaseMenu>
    </div>
  );
}

export default TheSettings;
