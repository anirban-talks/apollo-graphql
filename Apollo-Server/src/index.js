const {ApolloServer, gql} = require("apollo-server");
const { MemcachedCache } = require('apollo-server-cache-memcached');
const {persons} = require("../data/persons.json");

const typeDefs = gql`
    type Person{
        name: String!
        age: Int!
        sex: String
    }
    type Query{
        getPersons: [Person]!
    }
`;

const resolvers = {
    Query: {
        getPersons: ()=> persons,
    }
};

const cache = new MemcachedCache({retries: 10, retry: 10000});

const server = new ApolloServer({typeDefs,resolvers,cache});

server.listen().then(({url})=>{
    console.log(`Server Ready @ ${url}`);
});