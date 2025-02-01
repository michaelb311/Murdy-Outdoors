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
import { verifyUser } from './user';

const initState: StateType = {
	init: false,
	loading: false,
	darkMode: false,
	hunts: null,
	events: null,
	user: null,
	currentBooking: null,
	isModalOpen: false,
	modalContent: null,
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

		case 'SET_IS_MODAL_OPEN':
			return { ...state, isModalOpen: action.payload };

		case 'SET_MODAL_CONTENT':
			return { ...state, modalContent: action.payload };

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
		fetchGoogleCalendarEvents()
			.then((eventsResponse: GoogleCalendarEvent[]) => {
				dispatch({ type: 'SET_EVENTS', payload: eventsResponse });
			})
			.catch((error) => {
				console.error('Failed to fetch events:', error);
			});

		getHunts()
			.then((huntsResponse: HuntsResponseType) => {
				dispatch({ type: 'SET_HUNTS', payload: huntsResponse });
			})
			.catch((error) => {
				console.error('Failed to fetch hunts:', error);
			});

		const user = verifyUser();
		if (user) {
			console.log('user', user);
			dispatch({ type: 'SET_USER', payload: user.user });
		}

		dispatch({ type: 'SET_INIT', payload: true });

		await Promise.allSettled([fetchGoogleCalendarEvents(), getHunts()]).finally(
			() => {
				dispatch({ type: 'SET_LOADING', payload: false });
			}
		);
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
