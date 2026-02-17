const config = {
  schemaFile: '../openapi.yaml',
  apiFile: './src/services/emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/services/api.ts',
  exportName: 'api',
  hooks: true,
  tag: true,
};

export default config;
