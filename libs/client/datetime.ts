import moment from "moment";

export const getDateTimeString = (datetime: Date) => {
  const now = moment();
  const target = moment(datetime);
  if (now.diff(target, "day") < 7) {
    return target.fromNow();
  }
  return target.calendar();
};
