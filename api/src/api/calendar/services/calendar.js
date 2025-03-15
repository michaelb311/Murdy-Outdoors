const { google } = require("googleapis");
const path = require("path");

// Load the service account key JSON file
const keyFile = path.join(
  __dirname,
  "../../../../murdy-outdoors-7cd4c9535122.json",
);

// Create an OAuth2 client with the given credentials
const auth = new google.auth.GoogleAuth({
  keyFile,
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

// Function to fetch Google Calendar events
const fetchGoogleCalendarEvents = async () => {
  const authClient = await auth.getClient();
  // @ts-ignore
  const calendar = google.calendar({ version: "v3", auth: authClient });

  try {
    const response = await calendar.events.list({
      calendarId:
        "57785f68a496643cfdb622501ad695b3ddef3830903c80f33356bff3b1e13721@group.calendar.google.com",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items;
    return events;
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    throw error;
  }
};

const createGoogleCalendarEvent = async (event) => {
  const authClient = await auth.getClient();
  // @ts-ignore
  const calendar = google.calendar({ version: "v3", auth: authClient });
  try {
    const response = await calendar.events.insert({
      calendarId:
        "57785f68a496643cfdb622501ad695b3ddef3830903c80f33356bff3b1e13721@group.calendar.google.com",
      requestBody: {
        summary: event.summary,
        description: event.description,
        start: {
          date: event.start.date,
        },
        end: {
          date: event.end.date,
        },
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating calendar event:", error);
    throw error;
  }
};

const updateGoogleCalendarEvent = async (id, eventData) => {
  const authClient = await auth.getClient();
  // @ts-ignore
  const calendar = google.calendar({ version: "v3", auth: authClient });

  try {
    const response = await calendar.events.update({
      calendarId:
        "57785f68a496643cfdb622501ad695b3ddef3830903c80f33356bff3b1e13721@group.calendar.google.com",
      eventId: id,
      requestBody: {
        summary: eventData.summary,
        description: eventData.description,
        start: {
          dateTime: eventData.start,
          timeZone: "America/New_York",
        },
        end: {
          dateTime: eventData.end,
          timeZone: "America/New_York",
        },
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating calendar event:", error);
    throw error;
  }
};

const deleteGoogleCalendarEvent = async (id) => {
  const authClient = await auth.getClient();
  // @ts-ignore
  const calendar = google.calendar({ version: "v3", auth: authClient });

  try {
    await calendar.events.delete({
      calendarId:
        "57785f68a496643cfdb622501ad695b3ddef3830903c80f33356bff3b1e13721@group.calendar.google.com",
      eventId: id,
    });

    return { message: "Event deleted successfully" };
  } catch (error) {
    console.error("Error deleting calendar event:", error);
    throw error;
  }
};

module.exports = {
  fetchGoogleCalendarEvents,
  createGoogleCalendarEvent,
  updateGoogleCalendarEvent,
  deleteGoogleCalendarEvent,
};
