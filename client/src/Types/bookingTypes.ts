import { huntingMethod } from './huntTypes';
import { UserType } from './userTypes';

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
