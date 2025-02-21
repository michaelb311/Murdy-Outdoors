/* eslint-disable @typescript-eslint/no-unused-vars */
//create booking api call
//update booking api call
//delete booking api call
//find all user bookings api call
//find user booking by id api call
import { BookingType } from '../Types/bookingTypes';
import { hunting_methodType } from '../Types/huntTypes';
import { localUserData } from './user';
const baseURL = import.meta.env.VITE_DATABASE_URL as string;
const databaseToken = import.meta.env.VITE_DATABASE_TOKEN as string;
const localFormKey = import.meta.env.VITE_LOCAL_FORM_KEY as string;

//get all bookings for a user
export const userBookings = async () => {
	const user = localUserData();
	// console.log('userBookings user', user);
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
	// console.log('createBooking booking', booking);

	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};

	if (user?.user?.jwt) {
		headers.Authorization = `Bearer ${user.user.jwt}`;
	} else {
		headers.Authorization = `Bearer ${databaseToken}`;
	}

	const {
		documentId: huntDocumentId,
		hunting_methods,
		...huntData
	} = booking.hunt;

	// Ensure huntingMethods is an array of HuntingMethodType
	const huntingMethodsArray = Array.isArray(booking.huntingMethods)
		? booking.huntingMethods
		: [];

	// Extract the method from each object and join them into a comma-separated string
	const huntingMethodsString: string = huntingMethodsArray
		.map((method: hunting_methodType) => method.method)
		.join(', ');

	// console.log('huntingMethods', huntingMethodsString);

	if (!booking.user) {
		throw new Error('No user data provided');
	}

	// Type guard to check if it's a UserType
	if ('bookings' in booking.user) {
		const {
			documentId: userDocumentId,
			bookings: userBookings,
			reviews: userReviews,
			...userData
		} = booking.user;

		// Create a new array of bookings without the documentId property
		const userBookingData = booking.user.bookings.map(
			({ documentId, ...userBookingData }) => userBookingData
		);

		const bookingData = {
			...booking,
			huntingMethods: huntingMethodsString,
			hunt: {
				...huntData,
			},
			user: { ...userData, bookings: userBookingData, reviews: userReviews },
		};

		try {
			// console.log('createBooking bookingData', bookingData);
			const response = await fetch(`${baseURL}/bookings`, {
				method: 'POST',
				headers,
				body: JSON.stringify({ data: { ...bookingData } }),
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
	} else {
		// Handle GuestType
		const { documentId, ...userData } = booking.user;
		const bookingData = {
			...booking,
			huntingMethods: huntingMethodsString,
			hunt: {
				...huntData,
			},
			user: userData,
		};

		try {
			// console.log('createBooking bookingData', bookingData);
			const response = await fetch(`${baseURL}/bookings`, {
				method: 'POST',
				headers,
				body: JSON.stringify({ data: { ...bookingData } }),
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
	}
};

export const storeLocalBooking = (booking: BookingType) => {
	localStorage.setItem(localFormKey, JSON.stringify(booking));
};

export const getLocalBooking = () => {
	const booking = localStorage.getItem(localFormKey);
	if (booking) {
		return JSON.parse(booking) as BookingType;
	}
	return null;
};
