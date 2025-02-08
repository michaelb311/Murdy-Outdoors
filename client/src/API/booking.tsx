//create booking api call
//update booking api call
//delete booking api call
//find all user bookings api call
//find user booking by id api call
import { BookingType } from '../Types/bookingTypes';
import { localUserData } from './user';
const baseURL = import.meta.env.VITE_DATABASE_URL as string;

//get all bookings for a user
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

//creat a booking
export const createBooking = async (booking: BookingType) => {
	const user = localUserData();
	console.log('createBooking user', user);

	if (!user?.user) {
		console.error('User data is not available or malformed');
		throw new Error('User data is not available or malformed');
	}

	const jwt = user.user.jwt;
	if (!jwt) {
		console.log('JWT is not available, proceeding without authorization');
	}

	try {
		console.log('createBooking booking', booking);
		const response = await fetch(`${baseURL}/bookings`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(jwt && { Authorization: `Bearer ${jwt}` }),
			},
			body: JSON.stringify(booking),
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('API Error:', errorText);
			throw new Error(`Failed to create booking: ${response.statusText}`);
		}

		const data = (await response.json()) as BookingType;
		return data;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};
