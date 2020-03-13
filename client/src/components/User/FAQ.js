import React from "react";
import { useMediaQuery } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import MobileAddButtons from "../shared/MobileAddButtons";

export default function FAQ() {
  const mobileView = useMediaQuery("(max-width: 800px)");

  return (
    <div>
      <Typography variant="h4" component="h4" gutterBottom>
        How does this app work?
      </Typography>
      <Typography variant="body1" component="body1" gutterBottom></Typography>
      <Typography variant="h4" component="h4" gutterBottom>
        Why do I need to input my mood?
      </Typography>
      <Typography variant="body1" component="body1" gutterBottom></Typography>
      <Typography variant="h4" component="h4" gutterBottom>
        Do I need to input my mood every time I login?
      </Typography>
      <Typography variant="body1" component="body1" gutterBottom></Typography>
      <Typography variant="h4" component="h4" gutterBottom>
        Where can I see my completed tasks?
      </Typography>
      <Typography variant="body1" component="body1" gutterBottom></Typography>
      <Typography variant="h4" component="h4" gutterBottom>
        Where can I see my deleted tasks?
      </Typography>
      <Typography variant="body1" component="body1" gutterBottom></Typography>

      {mobileView && <MobileAddButtons />}
    </div>
  );
}
