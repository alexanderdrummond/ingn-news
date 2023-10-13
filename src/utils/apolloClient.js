import { ApolloClient, InMemoryCache } from '@apollo/client';

export function initializeApollo() {
  return new ApolloClient({
    uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnk7zx6y0rdg01udchckh5ov/master',
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
  });
}
