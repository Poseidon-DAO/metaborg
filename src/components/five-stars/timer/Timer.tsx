import { Box, CircularProgress, Heading, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { intervalToDuration, parseISO, addDays, isAfter } from "date-fns";

const IS_BURN_AVAILABLE = process.env.NEXT_PUBLIC_BURN_AVAILABLE === "true";
const BURN_START_DATE = process.env.NEXT_PUBLIC_BURN_START_DATE!;

const Timer = ({ onChange }: { onChange?: (duration: string) => void }) => {
  const [countdown, setCountdown] = useState<string | null>(null);
  const [isFuture, setIsFuture] = useState(false);

  useEffect(() => {
    const startDate = parseISO(BURN_START_DATE!);
    const endDate = addDays(startDate, 1);

    if (!IS_BURN_AVAILABLE) return;

    const intervalId = setInterval(() => {
      const now = new Date();

      let duration;

      if (isAfter(now, endDate)) {
        // burn end
        return setCountdown("");
      }

      if (isAfter(startDate, now)) {
        // burn will start
        duration = intervalToDuration({ start: now, end: startDate });
        setIsFuture(true);
      } else {
        // burn will end
        duration = intervalToDuration({ start: now, end: endDate });
        setIsFuture(false);
      }

      let durationString = "";

      if (duration.days) durationString += `${duration.days}d:`;
      durationString += `${duration.hours}h:`;
      durationString += `${duration.minutes}m:`;
      durationString += `${duration.seconds}s`;

      setCountdown(durationString);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (countdown === "") {
    return (
      <Heading size="2xl" mt="2" color="red">
        Burn ended!
      </Heading>
    );
  }

  return (
    <Box>
      <Heading size="md" mt="4">
        {isFuture ? "Burn starts in" : "Burn ends in"}
      </Heading>

      {countdown === null ? (
        <CircularProgress size="6" mt="2" isIndeterminate color="red" />
      ) : (
        <Heading size="2xl">{countdown}</Heading>
      )}
    </Box>
  );
};

export { Timer };
