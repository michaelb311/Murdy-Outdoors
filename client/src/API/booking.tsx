//create booking api call
//update booking api call
//delete booking api call
//find all bookings api call
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

export const getAllBookings = async () => {
	try {
		//gets all bookings with limited fields and populates hunt, user, and users fields
		const response = await fetch(
			`${baseURL}/bookings?fields[0]=guest&fields[1]=startDate&fields[2]=endDate&populate[hunt][fields][0]=title&populate[hunt][fields][1]=inStock&populate[user][fields][0]=username`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${databaseToken}`,
				},
			}
		);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('API Error:', errorText);
			throw new Error(`Failed to fetch bookings: ${response.statusText}`);
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

	const { documentId: huntDocumentId } = booking.hunt;

	// Ensure huntingMethods is an array of HuntingMethodType
	const huntingMethodsArray = Array.isArray(booking.huntingMethods)
		? booking.huntingMethods
		: [];

	// Extract the method from each object and join them into a comma-separated string
	const huntingMethodsString: string = huntingMethodsArray
		.map((method: hunting_methodType) => method.method)
		.join(', ');

	if (!booking.user) {
		throw new Error('No user data provided');
	}

	// Type guard to check if it's a UserType
	if (booking.user.documentId) {
		const { documentId: userDocumentId } = booking.user;

		const bookingData = {
			...booking,
			huntingMethods: huntingMethodsString,
			hunt: huntDocumentId,
			user: userDocumentId,
		};

		try {
			const createBookingResponse = await fetch(`${baseURL}/bookings`, {
				method: 'POST',
				headers,
				body: JSON.stringify({ data: { ...bookingData } }),
			});

			if (!createBookingResponse.ok) {
				const errorText = await createBookingResponse.text();
				console.error('API Error:', errorText);
				throw new Error(
					`Failed to create booking: ${createBookingResponse.statusText}`
				);
			}

			const data = (await createBookingResponse.json()) as BookingType;
			return data;
		} catch (error) {
			console.error('Fetch error:', error);
			throw error;
		}
	} else {
		// Handle GuestType
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { user, ...guestBooking } = booking;

		const bookingData = {
			...guestBooking,
			huntingMethods: huntingMethodsString,
			hunt: booking.hunt.documentId,
			guest: JSON.stringify(booking.user),
		};

		try {
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

//update booking
export const updateBooking = async (booking: BookingType) => {
	const user = localUserData();

	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};

	if (user?.user?.jwt) {
		headers.Authorization = `Bearer ${user.user.jwt}`;
	} else {
		headers.Authorization = `Bearer ${databaseToken}`;
	}

	const { documentId: bookingDocumentId } = booking;

	const bookingData = {
		...booking,
	};

	try {
		const response = await fetch(`${baseURL}/bookings/${bookingDocumentId}`, {
			method: 'PUT',
			headers,
			body: JSON.stringify({ data: { ...bookingData } }),
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('API Error:', errorText);
			throw new Error(`Failed to update booking: ${response.statusText}`);
		}

		const data = (await response.json()) as BookingType;
		return data;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};

//delete booking
export const deleteBooking = async (booking: BookingType) => {
	//if user owns the boooking to delete it.
	const user = localUserData();

	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};

	if (user?.user?.jwt) {
		headers.Authorization = `Bearer ${user.user.jwt}`;
	}

	const { documentId: bookingDocumentId } = booking;

	try {
		const response = await fetch(`${baseURL}/bookings/${bookingDocumentId}`, {
			method: 'DELETE',
			headers,
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('API Error:', errorText);
			throw new Error(`Failed to delete booking: ${response.statusText}`);
		}

		const data = (await response.json()) as BookingType;
		return data;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
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

export const clearLocalBooking = () => {
	localStorage.removeItem(localFormKey);
};
