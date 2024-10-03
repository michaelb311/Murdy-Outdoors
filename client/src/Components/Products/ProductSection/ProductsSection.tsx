import './styles.css';
import ProductCard from '../ProductCard/ProductCard';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../API/context';
import { HuntsResponseType } from '../../../Types/huntTypes';

const Products = () => {
	const [hunts, setHunts] = useState<HuntsResponseType | null>(null);
	const { state } = useContext(GlobalContext);

	useEffect(() => {
		setHunts(state.hunts);
	}, [state.hunts]);

	return (
		<section className='productsSection'>
			<h1 className='productsSectionTitle'>Hunts</h1>
			{hunts?.data.map((hunt) => (
				<ProductCard key={hunt.id} hunt={hunt} />
			))}
		</section>
	);
};
export default Products;
