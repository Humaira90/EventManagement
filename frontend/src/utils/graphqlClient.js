import { GraphQLClient } from 'graphql-request';

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"; // fallback for local dev

const client = new GraphQLClient(`${backendUrl}/graphql`);

export default client;
