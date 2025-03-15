import { BookingType } from '../Types/bookingTypes';
import {
	GoogleCalendarEvent,
	GoogleUser,
	createGoogleCalendarEventType,
} from '../Types/googleTypes';

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
	booking: BookingType
): Promise<GoogleCalendarEvent> => {
	const description = `
    <strong>Booking Details:</strong>
    - Hunt: ${booking.hunt.title}
    - Start Date: ${booking.startDate}
    - End Date: ${booking.endDate}
    - Hunting Methods: ${booking.huntingMethods
			.map((method) => method.method)
			.join(', ')}
	- Number of Guests: ${booking.numberOfGuests}
	- Number of Adults: ${booking.numberOfAdults}
	- Number of Children: ${booking.numberOfChildren}
	- User Name: ${booking.user?.firstName} ${booking.user?.lastName}
	- User Email: ${booking.user?.email}
	- Deposit: $${booking.deposit}
	- Total Price: $${booking.totalPrice}
	- Booking Status: ${booking.bookingStatus}
	- Booking ID: ${booking.documentId}
	- Booking ID: ${booking.id}
	`;

	const event: createGoogleCalendarEventType = {
		id: '',
		documentId: booking.documentId ?? '',
		summary: `Booking for ${booking.hunt.title} - ${booking.user?.firstName} ${booking.user?.lastName}`,
		description: description,
		start: { date: new Date(booking.startDate).toISOString().slice(0, 10) },
		end: { date: new Date(booking.endDate).toISOString().slice(0, 10) },
		creator: {
			email: booking.user?.email ?? '',
		},
		status: booking.bookingStatus,
	};
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

export const getGoogleUser = async (): Promise<GoogleUser> => {
	try {
		const response = await fetch(`${baseURL}/user/google/login`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		const data = (await response.json()) as GoogleUser;
		return data;
	} catch (error) {
		console.error('Error fetching Google user:', error);
		throw error;
	}
};
