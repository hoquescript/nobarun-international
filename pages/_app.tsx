import type { AppProps } from 'next/app';
import { Provider as SessionProvider } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import Layout from '../layout';
import useAuthProvider from '../hooks/useAuthProvider';
import store from '../store/configureStore';
import '../styles/main.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { createApolloClient } = useAuthProvider();
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <ApolloProvider client={createApolloClient()}>
          {router.pathname.startsWith('/auth') ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </ApolloProvider>
      </Provider>
    </SessionProvider>
  );
}
export default MyApp;
