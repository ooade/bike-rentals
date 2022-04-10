import { Layout } from '../../components';
import HomeFilters from './HomeFilters';
import Bikes from './bikes';

const Home = () => {
	return (
		<Layout>
			<HomeFilters />
			<Bikes />
		</Layout>
	);
};

export default Home;
