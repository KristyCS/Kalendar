const SET_EVENTS = "SET_EVENTS";

const setEvents = (events) => ({
  type: SET_EVENTS,
  events,
});

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
    default:
      return state;
  }
}
