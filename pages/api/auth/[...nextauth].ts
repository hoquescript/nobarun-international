import NextAuth from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';

import { gql } from '@apollo/client';

import Providers from 'next-auth/providers';
import client from '../../../apollo-client';
import useAuthProvider from '../../../hooks/useAuthProvider';

const LOGIN_QUERY = gql`
  query {
    login(data: { email: "azim@gmail.com", password: "iwilldoit" }) {
      token
    }
  }
`;

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      try {
        const { email, password } = credentials;
        const user = await client.query({
          query: LOGIN_QUERY,
          variables: { email, password },
        });

        if (user) return { status: 'success', data: user.data?.login };
      } catch (e: any) {
        const errorMessage = e.response.data.message;
        throw new Error(errorMessage + '&email=' + credentials.email);
      }
    },
  }),
];

const callbacks = {
  async jwt(token: any, user: any) {
    if (user) {
      token.accessToken = user.data.token;
    }
    return token;
  },

  async session(session: any, token: any) {
    session.accessToken = token.accessToken;
    return session;
  },
};

const options = {
  providers,
  callbacks,
  pages: {
    error: '/auth/error',
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
