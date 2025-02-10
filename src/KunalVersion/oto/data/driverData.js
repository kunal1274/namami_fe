// src/data/driverData.js

export const driverData = [
  {
    id: 1,
    name: "Patrick",
    rating: 4.5,
    canDriveCarTypes: ["Sedan", "Compact"],
    canDriveTransmissions: ["Automatic", "Manual"],
    availability: [
      // example day: Dec 30, from 9AM to 5PM
      { start: "2024-12-30T09:00:00", end: "2024-12-30T14:00:00" },
      { start: "2024-12-30T17:00:00", end: "2024-12-30T20:00:00" },
    ],
    distanceKm: 3.2,
    location: { lat: 40.7128, lng: -74.006 },
    status: "available", // "booked", "in_progress", "completing", "unavailable", "rejected" etc.
  },
  {
    id: 2,
    name: "Sophia",
    rating: 4.8,
    canDriveCarTypes: ["Luxury", "Sedan"],
    canDriveTransmissions: ["Automatic"],
    availability: [
      { start: "2024-12-30T10:00:00", end: "2024-12-30T15:00:00" },
      { start: "2024-12-30T18:00:00", end: "2024-12-30T20:00:00" },
      { start: "2024-12-31T09:00:00", end: "2024-12-31T12:00:00" },
    ],
    distanceKm: 1.5,
    location: { lat: 40.7538, lng: -73.9832 },
    status: "booked",
  },
  {
    id: 3,
    name: "Daniel",
    rating: 4.2,
    canDriveCarTypes: ["Sedan", "Compact", "Luxury"],
    canDriveTransmissions: ["Manual"],
    availability: [
      { start: "2024-12-30T08:00:00", end: "2024-12-30T22:00:00" },
    ],
    distanceKm: 5.1,
    location: { lat: 40.6718, lng: -73.9632 },
    status: "in_progress",
  },
  {
    id: 4,
    name: "Amelia",
    rating: 4.9,
    canDriveCarTypes: ["Luxury"],
    canDriveTransmissions: ["Automatic"],
    availability: [
      { start: "2024-12-30T08:00:00", end: "2024-12-30T20:00:00" },
    ],
    distanceKm: 2.9,
    location: { lat: 40.73061, lng: -73.935242 },
    status: "completing",
  },
  {
    id: 5,
    name: "Ethan",
    rating: 3.9,
    canDriveCarTypes: ["Compact"],
    canDriveTransmissions: ["Manual"],
    availability: [],
    distanceKm: 10.5,
    location: { lat: 40.7812, lng: -73.9665 }, // near Central Park
    status: "unavailable",
  },
  {
    id: 6,
    name: "Lucy",
    rating: 4.0,
    canDriveCarTypes: ["Sedan", "Compact"],
    canDriveTransmissions: ["Automatic"],
    availability: [],
    distanceKm: 8.3,
    location: { lat: 40.758, lng: -73.9855 },
    status: "rejected", // indicates she has rejected a ride
  },
  // Driver with overlapping availability blocks
  {
    id: 7,
    name: "Olivia",
    rating: 4.3,
    canDriveCarTypes: ["SUV", "Luxury"],
    canDriveTransmissions: ["Automatic"],
    availability: [
      { start: "2024-12-30T10:00:00", end: "2024-12-30T14:00:00" },
      { start: "2024-12-30T13:00:00", end: "2024-12-30T18:00:00" }, // Overlap
    ],
    distanceKm: 4.5,
    location: { lat: 40.7516, lng: -73.987 },
    status: "available",
  },
  // Driver with availability spanning midnight
  {
    id: 8,
    name: "James",
    rating: 4.6,
    canDriveCarTypes: ["Sedan"],
    canDriveTransmissions: ["Automatic", "Manual"],
    availability: [
      { start: "2024-12-30T22:00:00", end: "2024-12-31T02:00:00" },
    ],
    distanceKm: 3.2,
    location: { lat: 40.7218, lng: -74.012 },
    status: "booked",
  },
  // Driver with no availability
  {
    id: 9,
    name: "Emma",
    rating: 4.1,
    canDriveCarTypes: ["Compact", "Sedan"],
    canDriveTransmissions: ["Manual"],
    availability: [],
    distanceKm: 7.5,
    location: { lat: 40.7428, lng: -73.982 },
    status: "unavailable",
  },
];
