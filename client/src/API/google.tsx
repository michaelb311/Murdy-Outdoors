import { GoogleCalendarEvent } from '../Types/googleTypes';

const baseURL = import.meta.env.VITE_DATABASE_URL as string;
const token = import.meta.env.VITE_DATABASE_TOKEN as string;

export const fetchGoogleCalendarEvents = async (): Promise<
	GoogleCalendarEvent[]
> => {
	try {
		const response = await fetch(`${baseURL}/calendar/events`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error('Failed to fetch Google Calendar events');
		}

		const data = (await response.json()) as GoogleCalendarEvent[];

		return data;
	} catch (error) {
		console.error('Error fetching Google Calendar events:', error);
		throw error;
	}
};

export const createGoogleCalendarEvent = async (
	event: GoogleCalendarEvent
): Promise<GoogleCalendarEvent> => {
	try {
		const response = await fetch(`${baseURL}/calendar/events`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(event),
		});

		if (!response.ok) {
			throw new Error('Failed to create Google Calendar event');
		}

		const data = (await response.json()) as GoogleCalendarEvent;

		return data;
	} catch (error) {
		console.error('Error creating Google Calendar event:', error);
		throw error;
	}
};

export const updateGoogleCalendarEvent = async (
	event: GoogleCalendarEvent
): Promise<GoogleCalendarEvent> => {
	try {
		const response = await fetch(`${baseURL}/calendar/events/${event.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(event),
		});

		if (!response.ok) {
			throw new Error('Failed to update Google Calendar event');
		}

		const data = (await response.json()) as GoogleCalendarEvent;

		return data;
	} catch (error) {
		console.error('Error updating Google Calendar event:', error);
		throw error;
	}
};
