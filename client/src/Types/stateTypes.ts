/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { HuntsResponseType } from './huntTypes';
// import { GoogleCalendarEvent } from './googleTypes';

// Record<string, never>; means empty object but like really strict about it

export interface StateType {
	init: boolean;
	loading: boolean;
	darkMode: boolean;
	hunts: HuntsResponseType | null;
	events: any;
}

export type ActionType =
	| { type: 'SET_INIT'; payload: boolean }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_DARK_MODE'; payload: boolean }
	| { type: 'SET_HUNTS'; payload: HuntsResponseType | null }
	| { type: 'SET_EVENTS'; payload: any };

export type DispatchType = (action: ActionType) => void;

export interface ChildrenType {
	children?: ReactElement | ReactElement[];
}

export interface GlobalContextType {
	state: StateType;
	dispatch: DispatchType;
	init: () => void;
}
