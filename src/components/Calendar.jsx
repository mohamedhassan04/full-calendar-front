import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import AddEventModal from "./AddEventModal";
import axios from "axios";
import moment from "moment";
import { message } from "antd";

const Calendar = () => {
  const [modalOpen, setModelOpen] = useState(false);
  const [eventsDisp, setEventsDisp] = useState([]);
  const calenderRef = useRef(null);

  const onEventAdded = (event) => {
    let calendarApi = calenderRef.current.getApi();
    console.log(event);
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    });
  };

  async function handleEventAdd(data) {
    try {
      await axios.post("/api/calendar/create-event", data.event);
    } catch (error) {
      await message.error(error?.response?.data?.message);
    }
  }
  const handleDatesSet = async () => {
    try {
      const response = await axios.get("/api/calendar/get-events");
      setEventsDisp(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <section>
      <button onClick={() => setModelOpen(true)}>addEvent</button>

      <div style={{ position: "relative", zIndex: 0, marginTop: "10px" }}>
        <FullCalendar
          height="60vh"
          ref={calenderRef}
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          dayHeaderFormat={{ weekday: "long" }}
          headerToolbar={false}
          allDaySlot={false}
          locale="fr"
          slotMinTime={"08:00:00"}
          slotMaxTime={"19:00:00"}
          events={eventsDisp}
          eventAdd={(event) => handleEventAdd(event)}
          datesSet={(date) => handleDatesSet(date)}
          hiddenDays={[0]}
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
