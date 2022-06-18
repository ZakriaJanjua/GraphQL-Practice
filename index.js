const express = require('express');
const volleyball = require('volleyball');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schema');
const app = express();

app.use(volleyball);
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(9000, () => {
	console.log('listening on port 9000');
});
