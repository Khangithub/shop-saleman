import prettyMs from "pretty-ms";

export class TimeUtil {
  static convertTimestamp = (timestamp) =>
    timestamp
      ? prettyMs(Date.now() - new Date(timestamp), {
          compact: true,
        }) + " ago"
      : "";
}
