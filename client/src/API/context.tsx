import { createContext, ReactElement, useReducer, useCallback } from 'react';
import {
	ActionType,
	ChildrenType,
	GlobalContextType,
	StateType,
} from '../Types/stateTypes';
import { getHunts } from './hunts';
import { HuntsResponseType } from '../Types/huntTypes';
import { fetchGoogleCalendarEvents } from './google';
import { GoogleCalendarEvent } from '../Types/googleTypes';

const initState: StateType = {
	init: false,
	loading: false,
	darkMode: false,
	hunts: null,
	events: null,
	user: null,
	currentBooking: null,
};

const reducer = (state: StateType, action: ActionType): StateType => {
	switch (action.type) {
		case 'SET_INIT':
			return { ...state, init: action.payload };

		case 'SET_LOADING':
			return { ...state, loading: action.payload };

		case 'SET_DARK_MODE':
			return { ...state, darkMode: action.payload };

		case 'SET_HUNTS':
			return { ...state, hunts: action.payload };

		case 'SET_EVENTS':
			return { ...state, events: action.payload };

		case 'SET_USER':
			return { ...state, user: action.payload };

		case 'SET_CURRENT_BOOKING':
			return { ...state, currentBooking: action.payload };

		default:
			return state;
	}
};

export const GlobalContext = createContext<GlobalContextType>(
	{} as GlobalContextType
);

export const GlobalContextProvider = ({
	children,
}: ChildrenType): ReactElement => {
	const [state, dispatch] = useReducer(reducer, initState);

	const init = useCallback(async () => {
		dispatch({ type: 'SET_LOADING', payload: true });
		try {
			const eventsResponse: GoogleCalendarEvent[] =
				await fetchGoogleCalendarEvents();
			dispatch({ type: 'SET_EVENTS', payload: eventsResponse });
			const huntsResponse: HuntsResponseType = await getHunts();
			dispatch({ type: 'SET_HUNTS', payload: huntsResponse });
			dispatch({ type: 'SET_INIT', payload: true });
		} catch (error) {
			console.error('Failed to initialize:', error);
		} finally {
			dispatch({ type: 'SET_LOADING', payload: false });
		}
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				state,
				dispatch,
				init: () => {
					void init();
				},
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
