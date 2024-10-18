import { UserType } from './userTypes';

export type huntingMethod = 'Bow' | 'Rifle' | 'Crossbow' | 'Muzzleloader';

export interface HuntItemType {
	id: string | number;
	title: string;
	description: string;
	price: number;
	imageUrl: string;
	rating: number;
	stockCount: number;
	hunting_methods: {
		id: number;
		method: huntingMethod;
	}[];
	inStock: boolean;
	maxGuests: number;
}

export interface HuntsResponseType {
	data: HuntItemType[];
}

export interface BookingType {
	// Hunt details
	id: string;
	huntingMethods: huntingMethod[];

	// Guest information
	numberOfGuests: number;
	numberOfAdults: number;
	numberOfChildren: number;
	user:
		| {
				userId: string;
				firstName: string;
				lastName: string;
				email: string;
				phone: string;
		  }
		| UserType;

	// Booking details
	startDate: string;
	endDate: string;
	numberOfDays: number;

	// Payment information
	totalPrice: number;
	deposit: number;
	depositPayed: boolean;
	fullPayment: boolean;

	// Booking status
	status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
	confirmed: boolean;

	// Additional information
	documents: [];
}
