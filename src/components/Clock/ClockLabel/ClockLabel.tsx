import React from "react";
import moment from "moment";
import { ClockLabelProps } from "../../../Interfaces/ClockLabelProps";

const ClockLabel: React.FC<ClockLabelProps> = ({
  label,
  currentDateTime,
  offset,
  timezone,
}) => {
  const localDay = moment(currentDateTime).format("YYYY-MM-DD");
  const zoneDay =
    timezone.value &&
    moment.tz(currentDateTime, timezone.value).format("YYYY-MM-DD");
  let relativeDay = "";
  if (zoneDay && zoneDay > localDay) {
    relativeDay = "Tomorrow";
  } else if (zoneDay && zoneDay < localDay) {
    relativeDay = "Yesterday";
  } else {
    relativeDay = "Today";
  }

  return (
    <div className="text-center select-none">
      <h1 className="text-l font-semibold text-stone-50 mt-4">{label}</h1>
      <p className="text-stone-50">
        {relativeDay}
        {offset} {offset === "1" || offset === "-1" ? "hr" : "hrs"}
      </p>
      <p className="text-stone-50"></p>
    </div>
  );
};

export default ClockLabel;
