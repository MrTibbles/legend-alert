declare module "*.svg" {
  const content: any;
  export default content;
}

declare const PRODUCTION_ENV: boolean;

interface GraphQLResponse {
  [field: string]: any;
}

interface GraphQLOperation {
  [operationName: string]: GraphQLResponse;
}
