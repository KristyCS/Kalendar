const SET_EVENTS = "SET_EVENTS";
const ADD_EVENT = "ADD_EVENT";

const setEvents = (events) => ({
  type: SET_EVENTS,
  events,
});

const addEvent = (event) => ({
  type: ADD_EVENT,
  event,
});

export const createEvent =
  ({
    host_id,
    theme,
    description,
    posterFile,
    city,
    state,
    start_at,
    end_at,
  }) =>
  async (dispatch) => {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host_id,
        theme,
        description,
        posterFile,
        city,
        state,
        start_at,
        end_at,
      }),
    });
    if (response.ok) {
      const event = await response.json();
      dispatch(addEvent(event));
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
    dispatch(setEvents(events));
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

export default function reducer(state = { myEvents: null }, action) {
  switch (action.type) {
    case SET_EVENTS:
      return { myEvents: action.events };
    case ADD_EVENT:
      return {
        myEvents: { ...state.myEvents, [action.event.id]: action.event },
      };
    default:
      return state;
  }
}
