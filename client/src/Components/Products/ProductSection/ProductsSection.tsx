import './styles.css';
import ProductCard from '../ProductCard/ProductCard';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../API/context';
import { HuntItemType } from '../../../Types/huntTypes';

const Products = () => {
	const [hunts, setHunts] = useState<HuntItemType[]>([]);
	const { state } = useContext(GlobalContext);

	useEffect(() => {
		console.log(state.hunts);
		setHunts([...state.hunts]);
	}, [state.hunts]);

	return (
		<section className='productsSection'>
			<h1 className='productsSectionTitle'>Hunts</h1>
			{hunts.map((hunt) => (
				<ProductCard key={hunt.id} hunt={hunt} />
			))}
		</section>
	);
};
export default Products;
