# build-a-supergraph-subgraph-b

This is a work-in-progress repo and small part of the Apollo Solutions [build-a-supergraph](https://github.com/apollosolutions/build-a-supergraph) workshop.

Please watch the main repo for any updates and official releases.

---

**The code in this repository is experimental and has been provided for reference purposes only. Community feedback is welcome but this project may not be supported in the same way that repositories in the official [Apollo GraphQL GitHub organization](https://github.com/apollographql) are. If you need help you can file an issue on this repository, [contact Apollo](https://www.apollographql.com/contact-sales) to talk to an expert, or create a ticket directly in Apollo Studio.**

## Set up steps

To get the subgraph running locally please do the following steps:

1. `npm install`
2. `npm run build`

At this point you should be able to run `npm run start` to run the server locally.

### local development

When doing changes locally `npm run watch` will watch both the server and the TypeScript files.

### Docker build/run

Please follow the fowling steps to build and run this though docker:

1. `docker build . -t ghcr.io/GITHUB_USER_NAME/subgraph-b` - build command
2. `docker run -p 4000:4000 --name subgraph-b -t ghcr.io/GITHUB_USER_NAME/subgraph-b` - run command

## Open Telemetry Tracing

This repo is set up with Open Telemetry traces. Please add or change the variable of `OTEL_HTTP_ENDPOINT` in the `.env` file.

## Helm chart notes

- Make sure your docker image is public. If its not public the deploy will fail because it wont be able to pull the image.
- Please update the repo name in `deploy/subgraph-b/values.yaml` on line 4.

### Setting up github container registry

[github guide](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
