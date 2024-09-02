export interface User {
	id: number;
	firstName: string;
	lastName: string;
	fullName: string;
	role: 'Admin' | 'User';
	//update pastHunts/futureHunra to an array of type Hunts.  to be createad
	pastHunts: [];
	futureHunts: [];
}

export interface UserStateType {
	// Record<string, never> means empty object per typescript docs
	user: User | null;
}

export interface UserActionType {
	type: 'SET_USER';
	payload: User;
}

export type UserDispatchType = (action: UserActionType) => void;
