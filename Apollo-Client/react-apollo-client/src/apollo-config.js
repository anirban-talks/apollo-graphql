import ApolloClient from "apollo-boost";
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import {resolvers, typeDefs} from './resolvers';

import introspectionQueryResultData from './fragmentTypes.json';
const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const cache = new InMemoryCache({fragmentMatcher});
const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache,
    typeDefs,
    resolvers
});

export default client;