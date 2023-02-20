import React from 'react';
import { useQuery } from 'react-query';
import { getRestaurant } from './api/getRestaurant';

const id = '62c1a011e95e96a91dbfd023';

function App() {
	const { data } = useQuery(`restaurant${id}`, () => getRestaurant(id));
	console.log(data);
	return <div>hello</div>;
}

export default App;
