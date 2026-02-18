const config = {
  schemaFile: '../openapi.yaml',
  apiFile: './src/libs/emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/libs/api.ts',
  exportName: 'api',
  hooks: true,
  tag: true,
};

export default config;
