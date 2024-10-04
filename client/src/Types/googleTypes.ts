export interface GoogleCalendarEvent {
	id: string;
	summary: string;
	description: string;
	start: {
		dateTime: string;
	};
	end: {
		dateTime: string;
	};
}
