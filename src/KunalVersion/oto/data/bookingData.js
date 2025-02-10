// src/data/bookingData.js

export const bookingData = [
  {
    id: 201,
    driverId: 1, // Patrick
    customerId: 101, // John
    start: "2024-12-30T09:30:00",
    end: "2024-12-30T11:00:00",
    status: "in_progress",
  },
  {
    id: 202,
    driverId: 2, // Sophia
    customerId: 102, // Martha
    start: "2024-12-30T11:00:00",
    end: "2024-12-30T13:00:00",
    status: "confirmed",
  },
  {
    id: 203,
    driverId: 2,
    customerId: 103, // Kevin
    start: "2024-12-31T10:00:00",
    end: "2024-12-31T12:00:00",
    status: "requested",
  },
  {
    id: 204,
    driverId: 3, // Daniel
    customerId: 104, // imaginary new customer
    start: "2024-12-30T15:00:00",
    end: "2024-12-30T17:00:00",
    status: "confirmed",
  },
  {
    id: 205,
    driverId: null, // unassigned yet
    customerId: 105,
    start: "2024-12-30T20:00:00",
    end: "2024-12-30T21:30:00",
    status: "requested",
  },
  {
    id: 206,
    driverId: 2, // Sophia
    customerId: 102, // Martha
    start: "2024-12-30T17:00:00+05:30",
    end: "2024-12-30T20:00:00+05:30",
    status: "in_progress",
  },
  {
    id: 207,
    driverId: 3, // Daniel
    customerId: 102, // Martha
    start: "2024-12-30T21:00:00+05:30",
    end: "2024-12-30T23:00:00+05:30",
    status: "in_progress",
  },
  // Booking without an assigned driver
  {
    id: 208,
    driverId: null,
    customerId: 106, // Liam
    start: "2024-12-30T13:00:00",
    end: "2024-12-30T15:00:00",
    status: "requested",
  },
  // Booking with a start time in the past and no end time
  {
    id: 209,
    driverId: 7, // Olivia
    customerId: 104, // Jessica
    start: "2024-12-30T11:00:00",
    end: null,
    status: "in_progress",
  },
  // Booking spanning midnight
  {
    id: 210,
    driverId: 8, // James
    customerId: 101, // John
    start: "2024-12-30T23:00:00",
    end: "2024-12-31T01:00:00",
    status: "confirmed",
  },
  // Overlapping bookings for the same driver
  {
    id: 211,
    driverId: 7, // Olivia
    customerId: 102, // Martha
    start: "2024-12-30T15:00:00",
    end: "2024-12-30T17:00:00",
    status: "in_progress",
  },
];
