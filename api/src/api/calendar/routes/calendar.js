module.exports = {
  routes: [
    {
      method: "GET",
      path: "/calendar/events",
      handler: "calendar.fetchGoogleCalendarEvents",
    },
  ],
};
