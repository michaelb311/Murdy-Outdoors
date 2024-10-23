import { createContext, ReactElement, useReducer } from 'react';
import { ChildrenType } from '../Types/stateTypes';
import {
	UserActionType,
	UserDispatchType,
	UserStateType,
} from '../Types/userTypes';

const initUserState: UserStateType = {
	user: null,
};

const reducer = (
	state: UserStateType,
	action: UserActionType
): UserStateType => {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, user: action.payload };
		default:
			return state;
	}
};

export const UserContext = createContext<{
	state: UserStateType;
	dispatch: UserDispatchType;
	// eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ state: initUserState, dispatch: () => {} });

export const UserContextProvider = ({
	children,
}: ChildrenType): ReactElement => {
	const [state, dispatch] = useReducer(reducer, initUserState);

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	);
};
