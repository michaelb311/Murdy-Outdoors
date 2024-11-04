//create booking api call
//update booking api call
//delete booking api call
//find all user bookings api call
//find user booking by id api call
import { BookingType } from '../Types/bookingTypes';
import { localUserData } from './user';
const baseURL = import.meta.env.VITE_DATABASE_URL as string;

export const userBookings = async () => {
	const user = localUserData();
	console.log('userBookings user', user);
	try {
		const response = await fetch(
			`${baseURL}/bookings?filters[user][id][$eq]=${user.user.user.id}&populate=*`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.user.jwt}`,
				},
			}
		);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('API Error:', errorText);
			throw new Error(`Failed to fetch hunts: ${response.statusText}`);
		}

		const data = (await response.json()) as BookingType[];
		return data;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};
