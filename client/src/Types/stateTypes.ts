import { ReactElement } from 'react';
import { HuntType } from './huntTypes';

export interface StateType {
	// Record<string, never> means empty object per typescript docs
	init: boolean;
	loading: boolean;
	darkMode: boolean;
	hunts: HuntType[];
}

export type ActionType =
	| { type: 'SET_INIT'; payload: boolean }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_DARK_MODE'; payload: boolean }
	| { type: 'SET_HUNTS'; payload: HuntType[] };

export type DispatchType = (action: ActionType) => void;

export interface ChildrenType {
	children?: ReactElement | ReactElement[];
}
