import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress
        enableTrackSlot
        variant="determinate"
        color="secondary"
        value={progress}
      />
    </Box>
  );
};
