import React from "react";
import { useMediaQuery } from "@material-ui/core";

import MobileAddButtons from "../shared/MobileAddButtons";

export default function FAQ() {
  const tabletView = useMediaQuery("(max-width: 960px)");

  return (
    <div>
      <h2>FAQ information will be uploaded soon...</h2>

      {tabletView && <MobileAddButtons />}
    </div>
  );
}
