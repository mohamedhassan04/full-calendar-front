import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import AddEventModal from "./AddEventModal";
import axios from "axios";
import moment from "moment";

const Calendar = () => {
  const [modalOpen, setModelOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calenderRef = useRef(null);

  const onEventAdded = (event) => {
    let calendarApi = calenderRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    });
  };

  async function handleEventAdd(data) {
    console.log("data", data.event);
    await axios.post("/api/calendar/create-event", data.event);
  }

  // async function handleDatesSet(data) {
  //   const response = await axios.post(
  //     "http://localhost:5000/api/calendar/get-events"
  //   );
  //   console.log(response);
  //   setEvents(response);
  // }

  return (
    <section>
      <button onClick={() => setModelOpen(true)}>addEvent</button>

      <div style={{ position: "relative", zIndex: 0, marginTop: "10px" }}>
        <FullCalendar
          height="90vh"
          ref={calenderRef}
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          dayHeaderFormat={{ weekday: "long" }}
          headerToolbar={false}
          allDaySlot={false}
          locale="fr"
          events={events}
          eventAdd={(event) => handleEventAdd(event)}
          // datesSet={(date) => handleDatesSet(date)}
        />
      </div>

      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModelOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </section>
  );
};

export default Calendar;
