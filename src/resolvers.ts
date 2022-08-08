const products = [
  {
    id: 'apollo-federation',
    sku: 'federation',
    package: '@apollo/federation',
    variation: 'OSS',
  },
  { id: 'apollo-studio', sku: 'studio', package: '', variation: 'platform' },
];

export const resolvers = {
  Query: {
    allProducts: () => {
      return products;
    },
    product: (_: any, args: { id: string }) => {
      return products.find((p) => p.id == args.id);
    },
  },
  ProductItf: {
    __resolveType() {
      return 'Product';
    },
  },
  Product: {
    variation: (reference: any) => {
      if (reference.variation) {
        return { id: reference.variation };
      }

      const id = products.find((p) => p.id == reference.id)?.variation;

      return !id ? null : { id };
    },
    dimensions: () => {
      return { size: '1', weight: 1 };
    },
    createdBy: () => {
      return { email: 'support@apollographql.com', totalProductsCreated: 1337 };
    },
    __resolveReference: (reference: {
      id?: string;
      sku?: string;
      package?: string;
    }) => {
      if (reference.id) {
        return products.find((p) => p.id == reference.id);
      } else if (reference.sku && reference.package) {
        return products.find(
          (p) => p.sku == reference.sku && p.package == reference.package
        );
      } else {
        return { id: 'rover', package: '@apollo/rover', ...reference };
      }
    },
  },
};
