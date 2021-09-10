import { IconButton } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import { homepage } from "../../../package.json";

function GitHubLink() {
  return (
    <IconButton href={homepage} target="_blank" rel="noopener noreferrer">
      <GitHub />
    </IconButton>
  );
}

export default GitHubLink;
