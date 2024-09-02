import { createContext, ReactElement, useReducer } from 'react';
import {
	ActionType,
	ChildrenType,
	DispatchType,
	StateType,
} from '../Types/stateTypes';

const initState: StateType = {
	init: false,
	loading: false,
	darkMode: false,
};

const reducer = (state: StateType, action: ActionType): StateType => {
	switch (action.type) {
		case 'SET_INIT':
			return { ...state, init: action.payload };

		case 'SET_LOADING':
			return { ...state, loading: action.payload };

		case 'SET_DARK_MODE':
			return { ...state, darkMode: action.payload };
	}
};

export const GlobalContext = createContext<{
	state: StateType;
	dispatch: DispatchType;
	// eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ state: initState, dispatch: () => {} });

export const GlobalContextProvider = ({
	children,
}: ChildrenType): ReactElement => {
	const [state, dispatch] = useReducer(reducer, initState);

	return (
		<GlobalContext.Provider value={{ state, dispatch }}>
			{children}
		</GlobalContext.Provider>
	);
};
