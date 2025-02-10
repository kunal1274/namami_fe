// src/components/BookingCalendar.jsx
import React, { useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { parse, startOfWeek, getDay, format } from "date-fns";
import enUS from "date-fns/locale/en-US"; // Use import instead of require

function BookingCalendar({ bookings, drivers, customers }) {
  /**
   * We transform each booking to a "BigCalendar Event" shape:
   * { title, start, end, resource }
   * Where "resource" could store bookingId, driverId, etc.
   */
  const events = useMemo(() => {
    return bookings.map((b) => {
      const driver = drivers.find((d) => d.id === b.driverId);
      const customer = customers.find((c) => c.id === b.customerId);
      const title = driver
        ? `${driver.name} → ${customer?.name ?? "Unknown"}`
        : `Unassigned → ${customer?.name ?? "Unknown"}`;

      return {
        title,
        start: new Date(b.start),
        end: new Date(b.end),
        resource: {
          bookingId: b.id,
          status: b.status,
        },
      };
    });
  }, [bookings, drivers, customers]);

  // dateFns localizer config
  const locales = {
    "en-US": enUS,
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  return (
    <div className="mt-4 p-4 bg-white border border-gray-300 rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-2">Booking Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default BookingCalendar;
