import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Home/HomePage';

//add a protected routes inside the userContext so they can be checked for security

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/Hunts' element={<HomePage />} />
				<Route path='/User' element={<HomePage />} />
			</Routes>
		</Router>
	);
}

export default App;
