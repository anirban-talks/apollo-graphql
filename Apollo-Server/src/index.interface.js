const {ApolloServer, gql} = require("apollo-server");
const { MemcachedCache } = require('apollo-server-cache-memcached');
const {persons} = require("../data/persons.interface.json");

const typeDefs = gql`
    interface PersonInterface{
        name: String!
        age: Int!
        sex: String
    }
    type Person implements PersonInterface{
        name: String!
        age: Int!
        sex: String
    }
    type Employee implements PersonInterface{
        name: String!
        age: Int!
        sex: String
        empId: String!
        role: String
    }
    type User implements PersonInterface{
        name: String!
        age: Int!
        sex: String
        userId: String!
        address: String
    }
    type Query{
        getPersons: [PersonInterface]!
    }
`;

const resolvers = {
    Query: {
        getPersons: ()=> persons
    },
    PersonInterface: {
        __resolveType(person){
            if(!!person.empId){
                return "Employee";
            }else if(!!person.userId){
                return "User";
            }
            return "Person";
        }
    }
};

const cache = new MemcachedCache({retries: 10, retry: 10000});

const server = new ApolloServer({typeDefs,resolvers,cache});

server.listen().then(({url})=>{
    console.log(`Server Ready @ ${url}`);
});