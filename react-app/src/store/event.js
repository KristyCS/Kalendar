const SET_MYEVENTS = "SET_MYEVENTS";
const ADD_EVENT = "ADD_EVENT";
const UPDATE_EVENT = "UPDATE_EVENT;";
const SET_ALLEVENTS = "SET_ALLEVENTS";
const setMyEvents = (events) => ({
  type: SET_MYEVENTS,
  events,
});

const addEvent = (event) => ({
  type: ADD_EVENT,
  event,
});

const updateEvent = (event) => ({
  type: UPDATE_EVENT,
  event,
});

const setAllEvents = (events) => ({
  type: SET_ALLEVENTS,
  events,
});

export const editEvent =
  ({
    id,
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
    formData.append("id", id);
    formData.append("host_id", host_id);
    formData.append("theme", theme);
    formData.append("description", description);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("start_at", start_at);
    formData.append("end_at", end_at);
    formData.append("posterFile", posterFile);
    formData.append("label", label);

    const response = await fetch(`/api/events/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (response.ok) {
      const event = await response.json();

      let rsvps = await fetch(`/api/rsvps/event/${event.id}`);
      rsvps = await rsvps.json();
      rsvps = Object.values(rsvps);
      for (const rsvp of rsvps) {
        if (!participants.includes(rsvp.user_id)) {
          await fetch(`/api/rsvps/${rsvp.id}`, { method: "DELETE" });
        }
      }
      for (const participant of participants) {
        let rsvp = await fetch(
          `/api/rsvps/event/${event.id}/user/${participant}`
        );
        rsvp = await rsvp.json();
        
        if (Object.values(rsvp).length==0) {
          
          await fetch("/api/rsvps", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: participant,
              event_id: event.id,
              status: "no rsp",
            }),
          });
        }
      }
      const res = await fetch(`/api/rsvps/event/${event.id}`);
      const data = await res.json();
      event.rsvps = Object.values(data);
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
      for (const participant of participants) {
        await fetch("/api/rsvps", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: participant,
            event_id: event.id,
            status: "no rsp",
          }),
        });
      }
      const res = await fetch(`/api/rsvps/event/${event.id}`);
      const data = await res.json();
      event.rsvps = Object.values(data);
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
const createRsvp =
  ({ user_id, event_id }) =>
  async () => {
    const response = await fetch("/api/rsvps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: parseInt(user_id),
        event_id,
        status: "no rsp",
      }),
    });
    if (response.ok) {
      const rsvp = await response.json();
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
        eventsHostedByMe: {
          ...state.eventsHostedByMe,
          [action.event.id]: action.event,
        },
      };
    default:
      return state;
  }
}
