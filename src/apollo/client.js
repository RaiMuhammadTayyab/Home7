import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
      
    uri: '/.netlify/functions/record5',
    fetch,          
  }),
  cache: new InMemoryCache()
});