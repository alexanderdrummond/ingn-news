import '@/styles/globals.css';
import '@/components/News/NewsGrid.css';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../utils/apolloClient';  
import { AuthProvider } from '@/utils/authContext';
import Head from 'next/head';

const client = initializeApollo();  

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>INGN</title>
      </Head>
      <ApolloProvider client={client}>
        <div className="bg-custom-gray min-h-screen">
          <Component {...pageProps} />
        </div>
      </ApolloProvider>
    </AuthProvider>
  );
}
