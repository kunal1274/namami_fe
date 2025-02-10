// src/data/customerData.js

export const customerData = [
  {
    id: 101,
    name: "John",
    location: { lat: 40.7228, lng: -74.001 },
    status: "waiting", // "waiting", "requested", "about_to_complete", ...
    rideStart: "2024-12-30T09:00:00",
    rideEnd: "2024-12-30T13:00:00",
  },
  {
    id: 102,
    name: "Martha",
    location: { lat: 40.7527, lng: -73.9772 },
    status: "requested",
    rideStart: "2024-12-30T14:00:00",
    rideEnd: "2024-12-30T18:00:00",
  },
  {
    id: 103,
    name: "Kevin",
    location: { lat: 40.7616, lng: -73.9857 },
    status: "about_to_complete",
    rideStart: "2024-12-30T08:00:00",
    rideEnd: "2024-12-30T09:30:00",
  },
  // Overlapping ride times
  {
    id: 104,
    name: "Jessica",
    location: { lat: 40.7616, lng: -73.982 },
    status: "requested",
    rideStart: "2024-12-30T11:00:00",
    rideEnd: "2024-12-30T14:00:00",
  },
  // No assigned booking
  {
    id: 105,
    name: "Henry",
    location: { lat: 40.7828, lng: -73.976 },
    status: "waiting",
    rideStart: null,
    rideEnd: null,
  },
  // Ride spanning multiple driver availability blocks
  {
    id: 106,
    name: "Liam",
    location: { lat: 40.728, lng: -74.002 },
    status: "requested",
    rideStart: "2024-12-30T13:00:00",
    rideEnd: "2024-12-30T18:00:00",
  },
];
