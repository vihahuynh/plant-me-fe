import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { orderProgress } from "./../../data";
// const steps = [
//   "Select master blaster campaign settings",
//   "Create an ad group",
//   "Create an ad",
// ];

const OrderProgressBar = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={1} alternativeLabel>
        {orderProgress.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default OrderProgressBar;
