import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../API/userContext';
import { useContext } from 'react';
//Update this to check if the user is authenticated and if they are not, redirect them to the login page. GOAL - implement a deeper check than just null.

const ProtectedRoute = () => {
	const { state } = useContext(UserContext);
	const isAuthenticated = state.user !== null;

	return isAuthenticated ? <Outlet /> : <Navigate to='/User/login' />;
};

export default ProtectedRoute;
