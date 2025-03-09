import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import ProductsPage from './Pages/Products/ProductsPage';
import Products from './Components/Products/ProductSection/ProductsSection';
import ProductPage from './Pages/Product/ProductPage';
import MainNav from './Components/Navigation/MainNav/MainNav';
import { useContext, useEffect } from 'react';
import { GlobalContext } from './API/context';
import { UserContextProvider } from './API/userContext';
import UserPage from './Pages/User/UserPage';
import UserRegister from './Components/User/Register/UserRegister';
import UserLogout from './Components/User/Logout/UserLogout';
import ProtectedRoute from './Components/User/ProtectedRoute';
import ScrollToTop from './helpers/ScrollToTop';
import LoginPage from './Pages/Login/LoginPage';

function App() {
	const { init, state } = useContext(GlobalContext);
	useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main>
			<ScrollToTop />
			<UserContextProvider>
				<MainNav />
				{state.loading ? (
					<p>Loading...</p>
				) : (
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/Hunts' element={<ProductsPage />}>
							<Route index element={<Products />} />
							<Route path=':slug' element={<ProductPage />} />
						</Route>
						<Route path='/User' element={<ProtectedRoute />}>
							<Route index element={<UserPage />} />
						</Route>
						<Route path='/User/login' element={<LoginPage />} />
						<Route path='/User/register' element={<UserRegister />} />
						<Route path='/User/logout' element={<UserLogout />} />
					</Routes>
				)}
			</UserContextProvider>
		</main>
	);
}

export default App;
