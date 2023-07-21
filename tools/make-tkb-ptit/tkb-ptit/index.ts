import { writeFileSync } from "fs";
import * as ics from "ics";
import moment from "moment";


import tkb from "./tkb.json";
console.log(tkb[0]);

const tkbEvent = {
  loaiSuKien: "Lịch học",
  tenSuKien: "An toàn và bảo mật hệ thống thông tin - INT1303",
  thoiGianDienRa: "2022-02-24T07:00:00.000Z",
  thoiGianBatDau: "2022-02-24T07:00:00.000Z",
  thoiGianKetThuc: "2022-02-24T09:00:00.000Z",
  diaDiem: "402-A2",
  thu: 3,
  info: {
    id: 983920,
    lop_tin_chi_id: [56930, "INT1303-20212-07"],
    nhom_lop_tin_chi_id: false,
    hoc_phan_id: [2630, "INT1303"],
    ten_hoc_phan: "An toàn và bảo mật hệ thống thông tin",
    tong_so_sinh_vien: 70,
    ngay_bd: "2022-02-24",
    tiet_bd: false,
    so_tiet: 0,
    giang_vien_id: [3442, "TG0525"],
    email: "matamgv@ptit.edu.vn",
    ten_giang_vien: "Triệu Anh Dũng",
    dien_thoai: false,
    id_zoom: false,
    mat_khau_1: false,
  },
};

// convert string to date array
const dateArray = (dateString) => {
  const date = moment(dateString);
  return [
    date.year(),
    date.month() + 1,
    date.date(),
    date.hour(),
    date.minute(),
  ];
};

const listEvent = tkb.map((tkbEvent) => ({
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
      name: tkbEvent.info.ten_giang_vien,
      email: tkbEvent.info.email,
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
  listEvent,

  (error, value) => {
    if (error) {
      console.log(error);
    }

    writeFileSync(`${__dirname}/tkbptit.ics`, value);
  }
);

// json to google calendar
// https://calendar.google.com/calendar/u/0/r/settings/export
