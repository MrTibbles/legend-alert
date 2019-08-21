declare module "*.svg" {
  const content: any;
  export default content;
}

declare const PRODUCTION_ENV: boolean;
declare const GRAPHQL_API: string;
declare const PUBLIC_PATH: string;

interface GraphQLResponse {
  [field: string]: any;
}

interface GraphQLOperation {
  [operationName: string]: GraphQLResponse;
}
