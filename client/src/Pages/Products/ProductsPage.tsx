import { Outlet } from 'react-router-dom';

const ProductsPage = () => {
	return (
		<section>
			<h1>Available Hunts</h1>
			<Outlet />
		</section>
	);
};
export default ProductsPage;
