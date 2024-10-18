import { ReactElement } from 'react';
import { BookingType, HuntsResponseType } from './huntTypes';
import { GoogleCalendarEvent } from './googleTypes';
import { UserType } from './userTypes';

// Record<string, never>; means empty object but like really strict about it

export interface StateType {
	init: boolean;
	loading: boolean;
	darkMode: boolean;
	hunts: HuntsResponseType | null;
	events: GoogleCalendarEvent[] | null;
	user: UserType | null;
	currentBooking: BookingType | null;
}

export type ActionType =
	| { type: 'SET_INIT'; payload: boolean }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_DARK_MODE'; payload: boolean }
	| { type: 'SET_HUNTS'; payload: HuntsResponseType | null }
	| { type: 'SET_EVENTS'; payload: GoogleCalendarEvent[] | null }
	| { type: 'SET_USER'; payload: UserType | null }
	| { type: 'SET_CURRENT_BOOKING'; payload: BookingType | null };

export type DispatchType = (action: ActionType) => void;

export interface ChildrenType {
	children?: ReactElement | ReactElement[];
}

export interface GlobalContextType {
	state: StateType;
	dispatch: DispatchType;
	init: () => void;
}
