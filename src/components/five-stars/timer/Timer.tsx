import { Box, CircularProgress, Heading, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { intervalToDuration, parseISO, addDays } from "date-fns";

const IS_BURN_AVAILABLE = process.env.NEXT_PUBLIC_BURN_AVAILABLE === "true";
const BURN_START_DATE = process.env.NEXT_PUBLIC_BURN_START_DATE!;

const Timer = () => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const startDate = parseISO(BURN_START_DATE!);
    const endDate = addDays(startDate, 1);

    if (!IS_BURN_AVAILABLE) return;

    const intervalId = setInterval(() => {
      const now = new Date();

      const duration = intervalToDuration({ start: now, end: endDate });

      let durationString = "";
      if (duration.hours) durationString += `${duration.hours}h:`;
      if (duration.minutes) durationString += `${duration.minutes}m:`;
      if (duration.seconds) durationString += `${duration.seconds}s`;

      setCountdown(durationString);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box>
      <Heading size="md" mt="4">
        Burn ends in
      </Heading>

      {!countdown ? (
        <CircularProgress size="6" mt="2" isIndeterminate color="red" />
      ) : (
        <Heading size="lg">{countdown}</Heading>
      )}
    </Box>
  );
};

export { Timer };
