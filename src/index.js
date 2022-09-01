import React from 'react';
import ReactDOM from 'react-dom/client';
const { useState, useEffect } = React;
import axios from 'axios';

const root = ReactDOM.createRoot(document.querySelector('#root'));

// hook version of react
const App = () => {
	const [items, setItems] = useState([]);
	useEffect(() => {
		const loadItems = async () => {
			try {
				const response = await axios.get('/api/items');
				setItems(response.data);
			} catch (ex) {
				next(ex);
			}
		};
		loadItems();
	}, []);
	return (
		<div>
			<h1>The Numbers App ({items.length})</h1>
			<ul>
				{items.map((item) => {
					return <li key={item.id}>{item.data}</li>;
				})}
			</ul>
		</div>
	);
};

root.render(<App />);
