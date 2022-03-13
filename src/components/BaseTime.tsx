const convertTime = (t: number) => {
  const padZero = (num: number) => num.toString().padStart(2, "0");
  const hh = Math.floor((t % (24 * 60 * 60)) / (60 * 60));
  const mm = Math.floor(((t % (24 * 60 * 60)) % (60 * 60)) / 60);
  const ss = Math.floor(((t % (24 * 60 * 60)) % (60 * 60)) % 60);
  return hh ? hh + ":" + mm + ":" + padZero(ss) : mm + ":" + padZero(ss);
};

function BaseTime(props: { time: number; duration: number }) {
  return (
    <span className="base-time">
      {convertTime(props.time)} / {convertTime(props.duration)}
    </span>
  );
}

export default BaseTime;
