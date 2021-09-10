import { IconButton } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";

function GitHubLink() {
  return (
    <IconButton
      href="https://github.com/l1ck0h/keyboard"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GitHub />
    </IconButton>
  );
}

export default GitHubLink;
