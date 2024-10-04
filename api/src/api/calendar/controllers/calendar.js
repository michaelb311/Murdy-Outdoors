module.exports = {
  async fetchGoogleCalendarEvents(ctx) {
    try {
      const events = await strapi
        .service("api::calendar.calendar")
        .fetchGoogleCalendarEvents();
      ctx.send(events);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
};
