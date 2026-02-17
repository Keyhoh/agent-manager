import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Project, CreateProjectRequest, UpdateProjectRequest } from '@/libs/api-client/src';

export const projectsApiSlice = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  }),
  tagTypes: ['Project'],
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => '/projects',
      providesTags: ['Project'],
    }),
    getProject: builder.query<Project, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Project', id }],
    }),
    createProject: builder.mutation<Project, CreateProjectRequest>({
      query: (project) => ({
        url: '/projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<Project, { id: string; project: UpdateProjectRequest }>({
      query: ({ id, project }) => ({
        url: `/projects/${id}`,
        method: 'PUT',
        body: project,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Project', id }, 'Project'],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApiSlice;
