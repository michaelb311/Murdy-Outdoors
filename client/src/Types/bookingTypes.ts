import { HuntingMethodType } from './huntTypes';
import { GuestType, UserType } from './userTypes';
import { HuntItemType } from './huntTypes';


export interface BookingType {
	// Hunt details
	id?: string;
	huntingMethods: HuntingMethodType[];
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
