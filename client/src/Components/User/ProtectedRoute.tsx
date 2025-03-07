import { Navigate, Outlet } from 'react-router-dom';
import { getLocalUserData } from '../../API/user';
//Update this to check if the user is authenticated and if they are not, redirect them to the login page. GOAL - use httpOnly cookie to check if the user is authenticated.

const ProtectedRoute = () => {
	const user = getLocalUserData();

	return user.user ? <Outlet /> : <Navigate to='/User/login' />;
};

export default ProtectedRoute;
