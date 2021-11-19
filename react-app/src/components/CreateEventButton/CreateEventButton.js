import { MdAddComment } from "react-icons/md";
import "./CreateEventButton.css";
import { Modal } from "../../context/Modal";
import { useState } from "react";
import CreateEventPage from "../CreateEventPage/CreateEventPage";

const CreateEventButton = () => {
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowCreateEventModal(true)}
        className="create-event-button"
      >
        <MdAddComment />
        <p>Create</p>
      </div>
      {showCreateEventModal && (
        <Modal onClose={() => setShowCreateEventModal(false)}>
          <CreateEventPage setShowCreateEventModal={setShowCreateEventModal} />
        </Modal>
      )}
    </>
  );
};

export default CreateEventButton;
