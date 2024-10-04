const { google } = require("googleapis");

const fetchGoogleCalendarEvents = async () => {
  const calendar = google.calendar({
    version: "v3",
    auth: process.env.GOOGLE_API_KEY,
  });
  const calendarResponse = await calendar.events.list({
    calendarId:
      "57785f68a496643cfdb622501ad695b3ddef3830903c80f33356bff3b1e13721@group.calendar.google.com",
    timeMin: new Date().toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  const events = calendarResponse.data.items;
  return events;
};

module.exports = {
  fetchGoogleCalendarEvents,
};
