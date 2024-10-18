export interface GoogleCalendarEvent {
	id: string;
	created: string;
	creator: {
		email: string;
	};
	summary: string;
	start: {
		date: string;
	};
	end: {
		date: string;
	};
	status: string;
}

export interface GoogleUser {
	id: string;
	email: string;
	given_name: string;
	family_name: string;
	picture: string;
	locale: string;
}
