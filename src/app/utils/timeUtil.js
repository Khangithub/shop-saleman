import prettyMs from "pretty-ms";

export default class TimeUtil {
  static convertTimestamp(timestamp) {
    return timestamp
      ? prettyMs(Date.now() - new Date(timestamp), {
          compact: true,
        }) + " ago"
      : "";
  }
}
