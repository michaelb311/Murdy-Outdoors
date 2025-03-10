import { hunting_methodType } from './huntTypes';
import { GuestType, UserType } from './userTypes';
import { HuntItemType } from './huntTypes';

export interface BookingType {
	// Hunt details
	id?: number;
	documentId?: string;
	huntingMethods: hunting_methodType[];
	hunt: HuntItemType;

	// Guest information
	numberOfGuests: number;
	numberOfAdults: number;
	numberOfChildren: number;
	user: GuestType | UserType | null;

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
	bookingStatus: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
	confirmed: boolean;

	// Additional information
	documents: [];
	imageUrls: string[];
}

export interface BookingResponseType {
	data: BookingType;
	status?: number;
}
