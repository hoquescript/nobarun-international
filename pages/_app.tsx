import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import client from '../apollo-client';
import store from '../store/configureStore';
import '../styles/main.scss';
import Layout from '../layout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router.pathname.startsWith('/auth/login'));
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        {router.pathname.startsWith('/auth') ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ApolloProvider>
    </Provider>
  );
}
export default MyApp;
