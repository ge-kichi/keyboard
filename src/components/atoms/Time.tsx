import "./Time.css";

const convertTime = (t: number) => {
  const padZero = (num: number) => num.toString().padStart(2, "0");
  const hh = Math.floor((t % (24 * 60 * 60)) / (60 * 60));
  const mm = Math.floor(((t % (24 * 60 * 60)) % (60 * 60)) / 60);
  const ss = Math.floor(((t % (24 * 60 * 60)) % (60 * 60)) % 60);
  const mmss = mm + ":" + padZero(ss);
  if (!hh) {
    return mmss;
  } else {
    return hh + ":" + mmss;
  }
};

function Time(props: { time: number; duration: number }) {
  return (
    <span id="time">
      {convertTime(props.time)} / {convertTime(props.duration)}
    </span>
  );
}

export default Time;
