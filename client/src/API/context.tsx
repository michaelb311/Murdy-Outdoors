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
import {
	clearLocalBooking,
	getAllBookings,
	getLocalBooking,
	storeLocalBooking,
} from './booking';
import { BookingType } from '../Types/bookingTypes';

const initState: StateType = {
	init: false,
	loading: false,
	darkMode: false,
	hunts: null,
	events: null,
	bookings: null,
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

		case 'SET_BOOKINGS':
			return { ...state, bookings: action.payload };

		case 'SET_CURRENT_BOOKING':
			if (action.payload !== null) {
				storeLocalBooking(action.payload);
			} else {
				clearLocalBooking();
			}
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

	//gets all events, bookings, and hunts as well as local user data and current booking data if it exists
	const init = useCallback(async () => {
		dispatch({ type: 'SET_LOADING', payload: true });
		fetchGoogleCalendarEvents()
			.then((eventsResponse: GoogleCalendarEvent[]) => {
				dispatch({ type: 'SET_EVENTS', payload: eventsResponse });
			})
			.catch((error) => {
				console.error('Failed to fetch events:', error);
			});

		getAllBookings()
			.then((bookingsResponse: BookingType[]) => {
				dispatch({ type: 'SET_BOOKINGS', payload: bookingsResponse });
			})
			.catch((error) => {
				console.error('Failed to fetch bookings:', error);
			});

		getHunts()
			.then((huntsResponse: HuntsResponseType) => {
				dispatch({ type: 'SET_HUNTS', payload: huntsResponse });
			})
			.catch((error) => {
				console.error('Failed to fetch hunts:', error);
			});

		const localBooking = getLocalBooking();
		if (localBooking) {
			dispatch({ type: 'SET_CURRENT_BOOKING', payload: localBooking });
		}

		await Promise.allSettled([
			fetchGoogleCalendarEvents(),
			getHunts(),
			getAllBookings(),
		]).finally(() => {
			dispatch({ type: 'SET_INIT', payload: true });
			dispatch({ type: 'SET_LOADING', payload: false });
		});
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
