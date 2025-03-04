import { createContext, ReactElement, useEffect, useReducer } from 'react';
import { ChildrenType } from '../Types/stateTypes';
import {
	UserActionType,
	UserDispatchType,
	UserStateType,
} from '../Types/userTypes';
import { verifyLocalUser } from './user';

const initUserState: UserStateType = {
	user: null,
};

const userReducer = (
	state: UserStateType,
	action: UserActionType
): UserStateType => {
	switch (action.type) {
		case 'SET_USER':
			console.log('user reducer ran');
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
	const user = verifyLocalUser();

	// use this to re-render the user context when needed. Just add to the dependency array that which you want to re-render on.
	useEffect(() => {
		if (user) {
			console.log('user from user context', user);
			userDispatch({ type: 'SET_USER', payload: user.user });
		}
	}, []);

	return (
		<UserContext.Provider value={{ userState, userDispatch }}>
			{children}
		</UserContext.Provider>
	);
};
