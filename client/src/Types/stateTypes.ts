import { ReactElement } from 'react';
import { HuntsResponseType } from './huntTypes';
import { GoogleCalendarEvent } from './googleTypes';
import { BookingType } from './bookingTypes';

// Record<string, never>; means empty object but like really strict about it

export interface StateType {
	init: boolean;
	loading: boolean;
	darkMode: boolean;
	hunts: HuntsResponseType | null;
	bookings: BookingType[] | null;
	events: GoogleCalendarEvent[] | null;
	currentBooking: BookingType | null;
	isModalOpen: boolean;
	modalContent: ReactElement | null;
}

export type ActionType =
	| { type: 'SET_INIT'; payload: boolean }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_DARK_MODE'; payload: boolean }
	| { type: 'SET_HUNTS'; payload: HuntsResponseType | null }
	| { type: 'SET_BOOKINGS'; payload: BookingType[] | null }
	| { type: 'SET_EVENTS'; payload: GoogleCalendarEvent[] | null }
	| { type: 'SET_CURRENT_BOOKING'; payload: BookingType | null }
	| { type: 'SET_IS_MODAL_OPEN'; payload: boolean }
	| { type: 'SET_MODAL_CONTENT'; payload: ReactElement | null };

export type DispatchType = (action: ActionType) => void;

export interface ChildrenType {
	children?: ReactElement | ReactElement[];
}

export interface GlobalContextType {
	state: StateType;
	dispatch: DispatchType;
	init: () => void;
}
