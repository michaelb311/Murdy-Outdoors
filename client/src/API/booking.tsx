//create booking api call
//update booking api call
//delete booking api call
//find all user bookings api call
//find user booking by id api call
import { BookingType } from '../Types/bookingTypes';
import { localUserData } from './user';
import { huntingMethod } from '../Types/huntTypes';
const baseURL = import.meta.env.VITE_DATABASE_URL as string;
const databaseToken = import.meta.env.VITE_DATABASE_TOKEN as string;



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

	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};

	if (user?.user?.jwt) {
		headers.Authorization = `Bearer ${user.user.jwt}`;
	} else {
		headers.Authorization = `Bearer ${databaseToken}`;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { id,...huntData } = booking.hunt;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	booking.hunt.hunting_methods = booking.hunt.hunting_methods.map(({ documentId, ...method }) => method);
	// Convert huntingMethods to a comma-separated string
	const huntingMethodsString = booking.huntingMethods.map(({ method }: { method: huntingMethod }) => method).join(', ');
	// Assign the string back to booking.huntingMethods if needed
	booking.huntingMethods = huntingMethodsString;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { documentId: userDocumentId, ...userData } = booking.user;


	const bookingData = {
		...booking,
		hunt: {
			...huntData,
			hunting_methods: booking.hunt.hunting_methods,
		},
		user: userData,
	};

	try {
		console.log('createBooking booking', bookingData);
		const response = await fetch(`${baseURL}/bookings`, {
			method: 'POST',
			headers,
			body: JSON.stringify({ data: bookingData }),
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
