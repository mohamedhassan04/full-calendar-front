import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import moment from "moment";

const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const renderTimeConstraints = () => {
    // Adjust time constraints dynamically based on the current hour
    return {
      hours: {
        min: 8,
        max: 6,
        step: 1,
      },
    };
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onEventAdded({
      title,
      start: moment(start).toISOString().slice(0, -8) + "+00:00",
      end: moment(end).toISOString().slice(0, -8) + "+00:00",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <label>Start Date</label>
          <Datetime
            value={start}
            timeFormat="h:mm A"
            defaultValue={moment().startOf("day").add(8, "hours")}
            timeConstraints={() => renderTimeConstraints()}
            onChange={(date) => setStart(date)}
          />
        </div>

        <div>
          <label>End Date</label>
          <Datetime value={end} onChange={(date) => setEnd(date)} />
        </div>

        <button>Add Event</button>
      </form>
    </Modal>
  );
};

export default AddEventModal;
