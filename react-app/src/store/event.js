import { createRsvp } from "./rsvp";
const SET_MYEVENTS = "SET_MYEVENTS";
const ADD_EVENT = "ADD_EVENT";
const SET_ALLEVENTS = "SET_ALLEVENTS";
const setMyEvents = (events) => ({
  type: SET_MYEVENTS,
  events,
});

const addEvent = (event) => ({
  type: ADD_EVENT,
  event,
});

const setAllEvents = (events) => ({
  type: SET_ALLEVENTS,
  events,
});

export const editEvent =()=>{}

export const createEvent =
  ({
    host_id,
    theme,
    description,
    posterFile,
    city,
    label,
    participants,
    state,
    start_at,
    end_at,
  }) =>
  async (dispatch) => {
    const formData = new FormData();
    formData.append("host_id", host_id);
    formData.append("theme", theme);
    formData.append("description", description);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("start_at", start_at);
    formData.append("end_at", end_at);
    formData.append("posterFile", posterFile);
    formData.append("label", label);

    const response = await fetch("/api/events", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const event = await response.json();
      dispatch(addEvent(event));
      for (const participant of participants) {
        dispatch(createRsvp({ user_id: participant, event_id: event.id }));
      }
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const getEventsByUserId = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/events`);
  if (response.ok) {
    const events = await response.json();
    dispatch(setMyEvents(events));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const getAllEvents = () => async (dispatch) => {
  const response = await fetch(`/api/events`);
  if (response.ok) {
    const events = await response.json();
    dispatch(setAllEvents(events));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export default function reducer(
  state = { eventsHostedByMe: null, allEvents: null },
  action
) {
  switch (action.type) {
    case SET_ALLEVENTS:
      return { ...state, allEvents: action.events };
    case SET_MYEVENTS:
      return { ...state, eventsHostedByMe: action.events };
    case ADD_EVENT:
      return {
        allEvents: { ...state.allEvents, [action.event.id]: action.event },
        eventsHostedByMe: { ...state.eventsHostedByMe, [action.event.id]: action.event },
      };
    default:
      return state;
  }
}
