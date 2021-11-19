const customParseFormat = require('dayjs/plugin/customParseFormat')
export let  dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);
dayjs.extend(customParseFormat)
export const dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const buildMonthFrame = (date = new Date()) => {
  const firstDateInMonth = dayjs(date).startOf("month");
  const firstDateCurrentPeriod = firstDateInMonth.subtract(
    firstDateInMonth.day(),
    "day"
  );

  const monthFrame = new Array(6);
  let runner = firstDateCurrentPeriod;
  for (let i = 0; i < 6; i++) {
    monthFrame[i] = [];
    for (let j = 0; j < 7; j++) {
      monthFrame[i].push(runner);
      runner = runner.add(1, "day");
    }
  }
  return monthFrame;
};

export const getEventsInThisPeriod = (events, date) => {
  const enentsArray = events ? Object.values(events) : [];
  const firstDateInMonth = dayjs(date).startOf("month");
  const lastDateInMonth = dayjs(date).endOf("month");

  const firstDateCurrentPeriod = firstDateInMonth.subtract(
    firstDateInMonth.day(),
    "day"
  );
  const lastDateCurrentPeriod = lastDateInMonth.add(
    6 - lastDateInMonth.day(),
    "day"
  );
  const newEventsObj = {};

  for (const event of enentsArray) {
    const start_at_zone_transe = dayjs(event.start_at).utc();
    if (
      start_at_zone_transe.isBetween(
        firstDateCurrentPeriod,
        lastDateCurrentPeriod,
        null,
        "[]"
      )
    ) {
      if (
        !newEventsObj[
          start_at_zone_transe.month() + "-" + start_at_zone_transe.date()
        ]
      ) {
        newEventsObj[
          start_at_zone_transe.month() + "-" + start_at_zone_transe.date()
        ] = [event];
      } else {
        newEventsObj[
          start_at_zone_transe.month() + "-" + start_at_zone_transe.date()
        ].push(event);
      }
    }
  }
  return newEventsObj;
};
