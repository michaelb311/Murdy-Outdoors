import { BookingType } from './bookingTypes';
import { HuntItemType } from './huntTypes';

export interface ProductCardProps {
	hunt: HuntItemType;
	index: number;
}

export interface UserBookingCardProps {
	booking: BookingType;
}

export interface FormProps {
	hunt: HuntItemType;
}

export type ObjectFitType =
	| 'fill'
	| 'contain'
	| 'cover'
	| 'none'
	| 'scale-down';
