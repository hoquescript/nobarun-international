import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import client from '../apollo-client';
import store from '../store/configureStore';
import '../styles/main.scss';
import Layout from '../layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Provider>
  );
}
export default MyApp;
