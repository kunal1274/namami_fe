// src/utils/findAvailableDrivers.js

import {
  isWithinAnyAvailability,
  hasBookingConflict,
} from "./driverAvailability"; // from a prior snippet

export function findAvailableDrivers(drivers, bookings, start, end) {
  return drivers.filter((driver) => {
    // Must have availability
    if (!isWithinAnyAvailability(driver, start, end)) return false;
    // Must not conflict with existing bookings
    if (hasBookingConflict(driver.id, start, end, bookings)) return false;
    return true;
  });
}
