import { BookingType } from './bookingTypes';
import { UserType } from './userTypes';

export interface ReviewType {
	rating: number;
	title: string;
	review: string;
	createdAt: string;
	updatedAt: string;
	user: UserType;
	booking: BookingType;
}
