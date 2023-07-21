import { writeFileSync } from "fs";
import * as ics from "ics";
import moment from "moment";

import { TKB } from "./tkb";

console.log(TKB.data[0]);
// convert string to date array
// convert string to date array
const dateArray = (dateString: string) => {
  const date = moment(dateString);
  return [
    date.year(),
    date.month() + 1,
    date.date(),
    date.hour(),
    date.minute(),
  ] as [number, number, number, number, number];
};

const listEvent = TKB.data.map((tkbEvent) => ({
  start: dateArray(tkbEvent.thoiGianBatDau),
  end: dateArray(tkbEvent.thoiGianKetThuc),
  title: tkbEvent.tenSuKien,
  description: tkbEvent.info.ten_hoc_phan,
  location: tkbEvent.diaDiem,
  url: "https://ptit.edu.vn",
  status: "CONFIRMED",
  busyStatus: "BUSY",
  organizer: {
    name: "PTIT",
    email: "",
  },
  attendees: [
    {
      name: tkbEvent.info?.ten_giang_vien ? tkbEvent.info?.ten_giang_vien : "",
      email: tkbEvent.info?.email ? tkbEvent.info?.email : "",
      rsvp: true,
      partstat: "ACCEPTED",
      role: "Teacher",
    },
  ],
  categories: ["Lịch học"],
  alarms: [
    {
      action: "display",
      description: "Lịch học",
      summary: tkbEvent.tenSuKien,
      duration: { minutes: 15 },
      trigger: { minutes: 15 },
      repeat: 1,
      attachType: "VALUE=URI",
      attach: "https://ptit.edu.vn",
    },
  ],
}));

ics.createEvents(
  listEvent as any,

  (error, value) => {
    if (error) {
      console.log(error);
    }

    writeFileSync(`${__dirname}/tkbptit.ics`, value);
  }
);

// json to google calendar
// https://calendar.google.com/calendar/u/0/r/settings/export
