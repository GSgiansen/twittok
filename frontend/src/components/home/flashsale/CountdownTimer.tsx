import React, { FC } from "react";
import { Badge } from "@/components/ui/badge";

interface CountdownTimerProps {}

const CountdownTimer: FC<CountdownTimerProps> = () => {
  const sampleCountdown: string[] = ["01", "17", "28"];
  return (
    <div className="flex">
      {sampleCountdown.map((time, i) => (
        <div className="flex items-center">
          <Badge key={i} variant="countdown">
            {time}
          </Badge>
          {i !== sampleCountdown.length - 1 && (
            <span className="text-sm">:</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
