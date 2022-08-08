import { gql } from 'apollo-server';
import { readFileSync } from 'fs';
import * as path from 'path';
export const typeDefs = gql(
  readFileSync(path.resolve(__dirname, '../src/schema.graphql'), {
    encoding: 'utf-8',
  })
);
