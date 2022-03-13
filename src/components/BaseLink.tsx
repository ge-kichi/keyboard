function BaseLink(props: { url: string; label: string }) {
  return (
    <a
      className="base-link"
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.label}
    </a>
  );
}

export default BaseLink;
