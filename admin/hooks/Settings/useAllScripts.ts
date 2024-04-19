import { gql } from 'graphql-request';
import Client from '../../config/GraphqlClient';

const GET_ALL_SCRIPTS = gql`
  query getAllScripts {
    getAllTheScripts {
      id
      headerScript
      footerScript
    }
  }
`;

const useAllScripts = async () => {
  const data = await Client.request(GET_ALL_SCRIPTS);

  const scripts = {};
  if (data) {
    data.getAllTheScripts.forEach((script) => {
      scripts[script.id] = {
        header: script.headerScript,
        footer: script.footerScript,
        isDisabled: true,
      };
    });
  }
  return scripts;
};

export default useAllScripts;
