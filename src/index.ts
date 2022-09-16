import { buildSubgraphSchema } from "@apollo/subgraph";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./typedefs";
import { resolvers } from "./resolvers";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen(process.env.PORT ?? 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
