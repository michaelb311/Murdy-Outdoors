import { HuntItemType } from './huntTypes';

export interface UserType {
	id: number;
	firstName: string | null;
	lastName: string | null;
	fullName: string | null;
	role: 'Guest' | 'User';
	pastHunts: HuntItemType[];
	futureHunts: HuntItemType[];
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
