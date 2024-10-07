const { google } = require("googleapis");
const path = require("path");

// Load the service account key JSON file
const keyFile = path.join(
  __dirname,
  "../../../../murdy-outdoors-f6a0ed1638db.json",
);

// Create an OAuth2 client with the given credentials
const auth = new google.auth.GoogleAuth({
  keyFile,
  scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
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

module.exports = {
  fetchGoogleCalendarEvents,
};
