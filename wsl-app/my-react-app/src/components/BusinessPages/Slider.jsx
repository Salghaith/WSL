import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return value;
}

export default function DiscreteSlider({onChange}) {
    const handleSlider = (event, newValue) => {
        onChange((newValue*1000)); // Pass the value to the parent
      };
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Distence"
        defaultValue={0}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        onChange={handleSlider}
        step={1}
        marks
        min={0}
        max={10}
        color="black"
      />
    </Box>
  );
}
