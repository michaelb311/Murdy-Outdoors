import { BookingType } from './bookingTypes';
import { ReviewType } from './reviewTypes';

export interface UserType {
	id: number;
	documentId?: string;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: string;
	updatedAt: string;
	locale: string | null;
	publishedAt: string | null;
	firstName: string | null;
	lastName: string | null;
	bookings: BookingType[];
	reviews: ReviewType[];
	profilePicture: string | null;
}

export interface UserResponseType {
	jwt: string;
	user: UserType;
}

export interface UserStateType {
	// Record<string, never> means empty object per typescript docs
	user: UserType | null;
}

export interface UserActionType {
	type: 'SET_USER';
	payload: UserType;
}

export type UserDispatchType = (action: UserActionType) => void;

export interface UserLoginType {
	identifier: string;
	password: string;
}

export interface UserRegisterType {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	confirmPassword?: string;
}

export interface GuestType {
	id?: string;
	documentId?: string;
	firstName: string;
	lastName: string;
	email: string;
}

export interface GuestInfoProps {
	onGuestInfoSubmit: (guestInfo: GuestType) => void;
}
