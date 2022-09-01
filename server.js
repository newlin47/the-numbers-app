const express = require('express');
const app = express();
const path = require('path');
const { conn, Item } = require('./db');

app.use('/dist', express.static('dist'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/items', async (req, res, next) => {
	try {
		res.send(await Item.findAll());
	} catch (ex) {
		next(ex);
	}
});

const setup = async () => {
	try {
		await conn.sync({ force: true });
		await Promise.all([
			Item.create({ data: 1 }),
			Item.create({ data: 2 }),
			Item.create({ data: 3 }),
		]);
		const port = process.env.PORT || 3001;
		app.listen(port, () => {
			console.log(`Listening on port ${port}`);
		});
	} catch (ex) {
		console.log(ex);
	}
};

setup();
