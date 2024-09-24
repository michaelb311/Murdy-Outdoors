import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Home/HomePage';
import ProductsPage from './Pages/Products/ProductsPage';
import Products from './Components/Products/ProductSection/ProductsSection';
import ProductPage from './Pages/Product/ProductPage';
import MainNav from './Components/Navigation/MainNav/MainNav';

//add a protected routes inside the userContext so they can be checked for security

function App() {
	return (
		<main>
			<Router>
				<MainNav />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/Hunts' element={<ProductsPage />}>
						<Route index element={<Products />} />
						<Route path=':slug' element={<ProductPage />} />
					</Route>
					<Route path='/User' element={<HomePage />} />
				</Routes>
			</Router>
		</main>
	);
}

export default App;
