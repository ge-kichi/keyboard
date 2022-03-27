import { FC } from "react";

type BaseLinkProps = { url: string; label: string };

const BaseLink: FC<BaseLinkProps> = ({ url, label }) => (
  <a className="base-link" href={url} target="_blank" rel="noopener noreferrer">
    {label}
  </a>
);

export default BaseLink;
