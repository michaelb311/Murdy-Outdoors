import { ReactElement } from 'react';

export interface StateType {
	// Record<string, never> means empty object per typescript docs
	init: boolean;
	loading: boolean;
	darkMode: boolean;
}

export type ActionType =
	| { type: 'SET_INIT'; payload: boolean }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_DARK_MODE'; payload: boolean };

export type DispatchType = (action: ActionType) => void;

export interface ChildrenType {
	children?: ReactElement | ReactElement[];
}
