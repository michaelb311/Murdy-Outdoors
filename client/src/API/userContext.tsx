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

const userReducer = (
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
	userState: UserStateType;
	userDispatch: UserDispatchType;
}>({
	userState: initUserState,
	userDispatch: () => undefined,
});

export const UserContextProvider = ({
	children,
}: ChildrenType): ReactElement => {
	const [userState, userDispatch] = useReducer(userReducer, initUserState);

	return (
		<UserContext.Provider value={{ userState, userDispatch }}>
			{children}
		</UserContext.Provider>
	);
};
