import { gql } from "apollo-boost";

const LOCAL_PERSONS_QUERY = gql`
  query{
    getPersons @client{
      name
      age
      sex
    }
  }
`;

export const typeDefs = gql`
  extend type Mutation {
    addPerson(name: String!, age: String!, sex: String!): Boolean!
  }
`;

export const resolvers = {
    Mutation: {
        addPerson: (_root, {name, age, sex}, { cache }) => {
            const data = cache.readQuery({ query: LOCAL_PERSONS_QUERY });
            data.getPersons.push({
                name, 
                age: parseInt(age,10), 
                sex,
                __typename: 'Person'
            });
            console.log("Writing DATA to cache : ",data);
            cache.writeData({data});
            return true;
        }
    }
};