import NextAuth from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';

import { gql } from '@apollo/client';

import Providers from 'next-auth/providers';
import client from '../../../apollo-client';

const LOGIN_QUERY = gql`
  query getLoginData($data: LoginInput!) {
    login(data: $data) {
      token
    }
  }
`;

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    // @ts-ignore
    authorize: async (credentials) => {
      try {
        const { email, password } = credentials;
        const user = await client.query({
          query: LOGIN_QUERY,
          variables: { email, password },
        });
        console.log(user);
        if (user) return { status: 'success', data: user.data?.login };
      } catch (e: any) {
        const errorMessage = e.response.data.message;
        throw new Error(errorMessage + '&email=' + credentials.email);
      }
    },
  }),
];

// const refreshAccessToken = async (prevToken) => {
//   const token = await refreshEndpoint(prevToken);

//   // Do what you want

//   return {
//     accessToken: token.accessToken,
//     accessTokenExpires: Date.now() + token.expiresIn * 1000,
//   };
// }

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
    error: '/auth/login',
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
