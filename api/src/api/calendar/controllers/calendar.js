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
  async createGoogleCalendarEvent(ctx) {
    try {
      const event = await strapi
        .service("api::calendar.calendar")
        .createGoogleCalendarEvent(ctx.request.body);
      ctx.send(event);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  async updateGoogleCalendarEvent(ctx) {
    try {
      const event = await strapi
        .service("api::calendar.calendar")
        .updateGoogleCalendarEvent(ctx.params.id, ctx.request.body);
      ctx.send(event);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  async deleteGoogleCalendarEvent(ctx) {
    try {
      await strapi
        .service("api::calendar.calendar")
        .deleteGoogleCalendarEvent(ctx.params.id);
      ctx.send({ message: "Event deleted successfully" });
    } catch (error) {
      ctx.throw(500, error);
    }
  },
};
