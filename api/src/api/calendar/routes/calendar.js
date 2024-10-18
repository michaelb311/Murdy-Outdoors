module.exports = {
  routes: [
    {
      method: "GET",
      path: "/calendar/events",
      handler: "calendar.fetchGoogleCalendarEvents",
    },
    {
      method: "POST",
      path: "/calendar/events",
      handler: "calendar.createGoogleCalendarEvent",
    },
    {
      method: "PUT",
      path: "/calendar/events/:id",
      handler: "calendar.updateGoogleCalendarEvent",
    },
    {
      method: "DELETE",
      path: "/calendar/events/:id",
      handler: "calendar.deleteGoogleCalendarEvent",
    },
  ],
};
