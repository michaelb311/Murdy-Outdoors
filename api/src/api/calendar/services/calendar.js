const { google } = require("googleapis");
const path = require("path");

// Load the service account key JSON file
// development add to auth bellow
// const keyFile = path.join(
//   __dirname,
//   "../../../../murdy-outdoors-7cd4c9535122.json",
// );

//production add to auth bellow

// Create an OAuth2 client with the given credentials
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE,
    project_id: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
    private_key_id: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
    universe_domain: process.env.GOOGLE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN,
  },
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
        // development calendar
        //"57785f68a496643cfdb622501ad695b3ddef3830903c80f33356bff3b1e13721@group.calendar.google.com",
        // production calendar
        "0492480d325013e16e327219179bcfc715554526b2705ccd70b19c9797fc0359@group.calendar.google.com",
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
        // development calendar
        // "57785f68a496643cfdb622501ad695b3ddef3830903c80f33356bff3b1e13721@group.calendar.google.com",
        // production calendar
        "0492480d325013e16e327219179bcfc715554526b2705ccd70b19c9797fc0359@group.calendar.google.com",
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
        // development calendar
        // "57785f68a496643cfdb622501ad695b3ddef3830903c80f33356bff3b1e13721@group.calendar.google.com",
        // production calendar
        "0492480d325013e16e327219179bcfc715554526b2705ccd70b19c9797fc0359@group.calendar.google.com",
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
        // development calendar
        // "57785f68a496643cfdb622501ad695b3ddef3830903c80f33356bff3b1e13721@group.calendar.google.com",
        // production calendar
        "0492480d325013e16e327219179bcfc715554526b2705ccd70b19c9797fc0359@group.calendar.google.com",
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
