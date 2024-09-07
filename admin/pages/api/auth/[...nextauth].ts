import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

import { gql } from '@apollo/client';

import Providers from 'next-auth/providers';
import useUserInfo from '../../../hooks/useLoginData';

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
        const user = await useUserInfo(credentials.email, credentials.password);
        if (user) return { status: 'success', data: user };
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
      token = user.data;
    }
    return token;
  },

  async session(session: any, user: any) {
    session = { ...session, ...user, accessToken: user.token };
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
