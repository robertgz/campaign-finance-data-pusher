import { gql, request } from 'graphql-request'
import { GRAPHQL_URL } from '../globals.mjs';

const mutation = gql`
  mutation createAgency($name: String!, $software: String!, $urlToken: String!) {
    createAgency(input: {name: $name, software: $software, urlToken: $urlToken }) {
      id
      name
      software
    }
  }
`

const defaultVariables = {
  name: 'Unknown City',
  software: 'none',
};

async function main( variables = defaultVariables ) {
  const result = await request(GRAPHQL_URL, mutation, variables);

  return result;
}

export { main as createAgency };
