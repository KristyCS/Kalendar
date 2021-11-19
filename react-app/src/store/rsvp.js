export const createRsvp =
  ({ user_id, event_id }) =>
  async () => {
    const response = await fetch("/api/rsvps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id:parseInt(user_id),
        event_id,
        status:"no rsp",
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

  
