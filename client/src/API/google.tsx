const baseURL = import.meta.env.VITE_DATABASE_URL as string;
const token = import.meta.env.VITE_DATABASE_TOKEN as string;
export const fetchGoogleCalendarEvents = async () => {
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

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const data = await response.json();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return data;
	} catch (error) {
		console.error('Error fetching Google Calendar events:', error);
		throw error;
	}
};
