import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import ProductsPage from './Pages/Products/ProductsPage';
import Products from './Components/Products/ProductSection/ProductsSection';
import ProductPage from './Pages/Product/ProductPage';
import MainNav from './Components/Navigation/MainNav/MainNav';
import { useContext, useEffect } from 'react';
import { GlobalContext } from './API/context';
import { UserContextProvider } from './API/userContext';
import UserPage from './Pages/User/UserPage';
import UserLogin from './Components/User/Login/UserLogin';
import UserRegister from './Components/User/Register/UserRegister';
import UserLogout from './Components/User/Logout/UserLogout';
import ProtectedRoute from './Components/User/ProtectedRoute';
//add a protected routes inside the userContext so they can be checked for security

function App() {
	const { init } = useContext(GlobalContext);

	useEffect(() => {
		init();
	}, []);

	return (
		<main>
			<Router>
				<UserContextProvider>
					<MainNav />
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/Hunts' element={<ProductsPage />}>
							<Route index element={<Products />} />
							<Route path=':slug' element={<ProductPage />} />
						</Route>
						<Route path='/User' element={<ProtectedRoute />}>
							<Route path='UserPage' element={<UserPage />} />
						</Route>
						<Route path='/User/login' element={<UserLogin />} />
						<Route path='/User/register' element={<UserRegister />} />
						<Route path='/User/logout' element={<UserLogout />} />
					</Routes>
				</UserContextProvider>
			</Router>
		</main>
	);
}

export default App;
