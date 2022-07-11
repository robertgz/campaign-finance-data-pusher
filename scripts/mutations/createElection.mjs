import { gql, request } from 'graphql-request'
import { GRAPHQL_URL } from '../globals.mjs';

const mutation = gql`
  mutation createElection($agencyId: String!, $date: String!) {
    createElection(input: {agencyId: $agencyId, date: $date}) {
      id
      date
    }
  }
`

async function main( variables ) {
  const result = await request(GRAPHQL_URL, mutation, variables);

  return result;
}

export { main as createElection };
