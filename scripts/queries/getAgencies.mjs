import { gql, request } from 'graphql-request'
import { GRAPHQL_URL } from '../globals.mjs';

const query = gql`
  {
    agencies {
      id
      name
      software
      url
    }
  }
`;

async function main() {
  const result = await request(GRAPHQL_URL, query);

  return result;
}

export { main as getAgencies };
