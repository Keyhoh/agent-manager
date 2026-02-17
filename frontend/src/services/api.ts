import { Configuration, ProjectsApi } from '@/libs/api-client/src';

const config = new Configuration({
  basePath: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
});

export const projectsApi = new ProjectsApi(config);
