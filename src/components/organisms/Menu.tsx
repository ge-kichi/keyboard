import { Sampler } from "tone";
import PlayMidi from "../molecules/FileDrop";
import Toolbar from "../molecules/Toolbar";
import "./Menu.css";

function Menu(props: { sampler: Sampler | undefined }) {
  return (
    <div id="menu">
      <PlayMidi sampler={props.sampler} />
      <Toolbar sampler={props.sampler} />
    </div>
  );
}

export default Menu;
