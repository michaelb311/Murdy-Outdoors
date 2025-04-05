import { Link } from 'react-router-dom';
import './styles.css';

const PageNotFound = () => {
	return (
		<div className='page-not-found-container'>
			<h1 className='page-not-found-title'>Page Not Found</h1>
			<Link to='/' className='page-not-found-link'>
				Go back to the home page
			</Link>
		</div>
	);
};
export default PageNotFound;
