import { HuntItemType } from './huntTypes';

export interface UserType {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: string;
	updatedAt: string;
	documentId: string;
	locale: string | null;
	publishedAt: string | null;
	firstName: string | null;
	lastName: string | null;
	bookings: HuntItemType[];
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
