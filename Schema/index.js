const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
    GraphQLInt
} = require('graphql');

const UserType = require('./TypeDefs/UserType');
const DATA = require('../MOCK_DATA.json')

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		getAllUsers: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return DATA;
			},
		},
		getUserByName: {
			type: new GraphQLList(UserType),
			args: { first_name: { type: GraphQLString } },
            resolve(parent, args) {
                return DATA.filter(user => user.first_name === args.first_name);
            }
		},
		getUserById: {
			type: new GraphQLList(UserType),
			args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return DATA.filter(user => user.id === args.id);
            }
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		createUser: {
			type: UserType,
			args: {
				first_name: { type: GraphQLString },
				last_name: { type: GraphQLString },
				email: { type: GraphQLString },
			},
			resolve(parent, args) {
				DATA.push({
					id: DATA.length + 1,
					first_name: args.first_name,
					last_name: args.last_name,
					email: args.email,
				});
				return args;
			},
		},
	},
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
