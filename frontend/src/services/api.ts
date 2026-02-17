import { emptySplitApi as api } from "./emptyApi";
export const addTagTypes = [
  "Projects",
  "Tasks",
  "Sprints",
  "Agents",
  "Reviews",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getProjects: build.query<GetProjectsApiResponse, GetProjectsApiArg>({
        query: () => ({ url: `/projects` }),
        providesTags: ["Projects"],
      }),
      postProjects: build.mutation<PostProjectsApiResponse, PostProjectsApiArg>(
        {
          query: (queryArg) => ({
            url: `/projects`,
            method: "POST",
            body: queryArg.createProjectRequest,
          }),
          invalidatesTags: ["Projects"],
        },
      ),
      getProjectsByProjectId: build.query<
        GetProjectsByProjectIdApiResponse,
        GetProjectsByProjectIdApiArg
      >({
        query: (queryArg) => ({ url: `/projects/${queryArg.projectId}` }),
        providesTags: ["Projects"],
      }),
      putProjectsByProjectId: build.mutation<
        PutProjectsByProjectIdApiResponse,
        PutProjectsByProjectIdApiArg
      >({
        query: (queryArg) => ({
          url: `/projects/${queryArg.projectId}`,
          method: "PUT",
          body: queryArg.updateProjectRequest,
        }),
        invalidatesTags: ["Projects"],
      }),
      deleteProjectsByProjectId: build.mutation<
        DeleteProjectsByProjectIdApiResponse,
        DeleteProjectsByProjectIdApiArg
      >({
        query: (queryArg) => ({
          url: `/projects/${queryArg.projectId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Projects"],
      }),
      getProjectsByProjectIdBacklog: build.query<
        GetProjectsByProjectIdBacklogApiResponse,
        GetProjectsByProjectIdBacklogApiArg
      >({
        query: (queryArg) => ({
          url: `/projects/${queryArg.projectId}/backlog`,
        }),
        providesTags: ["Tasks"],
      }),
      postTasks: build.mutation<PostTasksApiResponse, PostTasksApiArg>({
        query: (queryArg) => ({
          url: `/tasks`,
          method: "POST",
          body: queryArg.createTaskRequest,
        }),
        invalidatesTags: ["Tasks"],
      }),
      getTasksByTaskId: build.query<
        GetTasksByTaskIdApiResponse,
        GetTasksByTaskIdApiArg
      >({
        query: (queryArg) => ({ url: `/tasks/${queryArg.taskId}` }),
        providesTags: ["Tasks"],
      }),
      putTasksByTaskId: build.mutation<
        PutTasksByTaskIdApiResponse,
        PutTasksByTaskIdApiArg
      >({
        query: (queryArg) => ({
          url: `/tasks/${queryArg.taskId}`,
          method: "PUT",
          body: queryArg.updateTaskRequest,
        }),
        invalidatesTags: ["Tasks"],
      }),
      deleteTasksByTaskId: build.mutation<
        DeleteTasksByTaskIdApiResponse,
        DeleteTasksByTaskIdApiArg
      >({
        query: (queryArg) => ({
          url: `/tasks/${queryArg.taskId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Tasks"],
      }),
      postTasksByTaskIdSplit: build.mutation<
        PostTasksByTaskIdSplitApiResponse,
        PostTasksByTaskIdSplitApiArg
      >({
        query: (queryArg) => ({
          url: `/tasks/${queryArg.taskId}/split`,
          method: "POST",
        }),
        invalidatesTags: ["Tasks"],
      }),
      postTasksByTaskIdExecute: build.mutation<
        PostTasksByTaskIdExecuteApiResponse,
        PostTasksByTaskIdExecuteApiArg
      >({
        query: (queryArg) => ({
          url: `/tasks/${queryArg.taskId}/execute`,
          method: "POST",
        }),
        invalidatesTags: ["Tasks"],
      }),
      getSprints: build.query<GetSprintsApiResponse, GetSprintsApiArg>({
        query: (queryArg) => ({
          url: `/sprints`,
          params: {
            projectId: queryArg.projectId,
          },
        }),
        providesTags: ["Sprints"],
      }),
      postSprints: build.mutation<PostSprintsApiResponse, PostSprintsApiArg>({
        query: (queryArg) => ({
          url: `/sprints`,
          method: "POST",
          body: queryArg.createSprintRequest,
        }),
        invalidatesTags: ["Sprints"],
      }),
      getSprintsBySprintId: build.query<
        GetSprintsBySprintIdApiResponse,
        GetSprintsBySprintIdApiArg
      >({
        query: (queryArg) => ({ url: `/sprints/${queryArg.sprintId}` }),
        providesTags: ["Sprints"],
      }),
      putSprintsBySprintId: build.mutation<
        PutSprintsBySprintIdApiResponse,
        PutSprintsBySprintIdApiArg
      >({
        query: (queryArg) => ({
          url: `/sprints/${queryArg.sprintId}`,
          method: "PUT",
          body: queryArg.updateSprintRequest,
        }),
        invalidatesTags: ["Sprints"],
      }),
      postSprintsBySprintIdPlan: build.mutation<
        PostSprintsBySprintIdPlanApiResponse,
        PostSprintsBySprintIdPlanApiArg
      >({
        query: (queryArg) => ({
          url: `/sprints/${queryArg.sprintId}/plan`,
          method: "POST",
        }),
        invalidatesTags: ["Sprints"],
      }),
      getSprintsBySprintIdTasks: build.query<
        GetSprintsBySprintIdTasksApiResponse,
        GetSprintsBySprintIdTasksApiArg
      >({
        query: (queryArg) => ({ url: `/sprints/${queryArg.sprintId}/tasks` }),
        providesTags: ["Sprints"],
      }),
      getSprintsBySprintIdBurndown: build.query<
        GetSprintsBySprintIdBurndownApiResponse,
        GetSprintsBySprintIdBurndownApiArg
      >({
        query: (queryArg) => ({
          url: `/sprints/${queryArg.sprintId}/burndown`,
        }),
        providesTags: ["Sprints"],
      }),
      getAgents: build.query<GetAgentsApiResponse, GetAgentsApiArg>({
        query: () => ({ url: `/agents` }),
        providesTags: ["Agents"],
      }),
      getAgentsByAgentId: build.query<
        GetAgentsByAgentIdApiResponse,
        GetAgentsByAgentIdApiArg
      >({
        query: (queryArg) => ({ url: `/agents/${queryArg.agentId}` }),
        providesTags: ["Agents"],
      }),
      postReviews: build.mutation<PostReviewsApiResponse, PostReviewsApiArg>({
        query: (queryArg) => ({
          url: `/reviews`,
          method: "POST",
          body: queryArg.createReviewRequest,
        }),
        invalidatesTags: ["Reviews"],
      }),
      getReviewsByReviewId: build.query<
        GetReviewsByReviewIdApiResponse,
        GetReviewsByReviewIdApiArg
      >({
        query: (queryArg) => ({ url: `/reviews/${queryArg.reviewId}` }),
        providesTags: ["Reviews"],
      }),
      putReviewsByReviewId: build.mutation<
        PutReviewsByReviewIdApiResponse,
        PutReviewsByReviewIdApiArg
      >({
        query: (queryArg) => ({
          url: `/reviews/${queryArg.reviewId}`,
          method: "PUT",
          body: queryArg.updateReviewRequest,
        }),
        invalidatesTags: ["Reviews"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as api };
export type GetProjectsApiResponse =
  /** status 200 プロジェクト一覧 */ Project[];
export type GetProjectsApiArg = void;
export type PostProjectsApiResponse =
  /** status 201 プロジェクト作成成功 */ Project;
export type PostProjectsApiArg = {
  createProjectRequest: CreateProjectRequest;
};
export type GetProjectsByProjectIdApiResponse =
  /** status 200 プロジェクト詳細 */ Project;
export type GetProjectsByProjectIdApiArg = {
  projectId: string;
};
export type PutProjectsByProjectIdApiResponse =
  /** status 200 プロジェクト更新成功 */ Project;
export type PutProjectsByProjectIdApiArg = {
  projectId: string;
  updateProjectRequest: UpdateProjectRequest;
};
export type DeleteProjectsByProjectIdApiResponse = unknown;
export type DeleteProjectsByProjectIdApiArg = {
  projectId: string;
};
export type GetProjectsByProjectIdBacklogApiResponse =
  /** status 200 バックログタスク一覧 */ Task[];
export type GetProjectsByProjectIdBacklogApiArg = {
  projectId: string;
};
export type PostTasksApiResponse = /** status 201 タスク作成成功 */ Task;
export type PostTasksApiArg = {
  createTaskRequest: CreateTaskRequest;
};
export type GetTasksByTaskIdApiResponse = /** status 200 タスク詳細 */ Task;
export type GetTasksByTaskIdApiArg = {
  taskId: string;
};
export type PutTasksByTaskIdApiResponse = /** status 200 タスク更新成功 */ Task;
export type PutTasksByTaskIdApiArg = {
  taskId: string;
  updateTaskRequest: UpdateTaskRequest;
};
export type DeleteTasksByTaskIdApiResponse = unknown;
export type DeleteTasksByTaskIdApiArg = {
  taskId: string;
};
export type PostTasksByTaskIdSplitApiResponse =
  /** status 200 タスク分割成功 */ Task[];
export type PostTasksByTaskIdSplitApiArg = {
  taskId: string;
};
export type PostTasksByTaskIdExecuteApiResponse =
  /** status 200 タスク実行成功 */ TaskExecutionResult;
export type PostTasksByTaskIdExecuteApiArg = {
  taskId: string;
};
export type GetSprintsApiResponse = /** status 200 スプリント一覧 */ Sprint[];
export type GetSprintsApiArg = {
  projectId: string;
};
export type PostSprintsApiResponse =
  /** status 201 スプリント作成成功 */ Sprint;
export type PostSprintsApiArg = {
  createSprintRequest: CreateSprintRequest;
};
export type GetSprintsBySprintIdApiResponse =
  /** status 200 スプリント詳細 */ Sprint;
export type GetSprintsBySprintIdApiArg = {
  sprintId: string;
};
export type PutSprintsBySprintIdApiResponse =
  /** status 200 スプリント更新成功 */ Sprint;
export type PutSprintsBySprintIdApiArg = {
  sprintId: string;
  updateSprintRequest: UpdateSprintRequest;
};
export type PostSprintsBySprintIdPlanApiResponse =
  /** status 200 スプリントプラン作成成功 */ Sprint;
export type PostSprintsBySprintIdPlanApiArg = {
  sprintId: string;
};
export type GetSprintsBySprintIdTasksApiResponse =
  /** status 200 スプリントバックログ */ Task[];
export type GetSprintsBySprintIdTasksApiArg = {
  sprintId: string;
};
export type GetSprintsBySprintIdBurndownApiResponse =
  /** status 200 バーンダウンチャートデータ */ BurndownChart;
export type GetSprintsBySprintIdBurndownApiArg = {
  sprintId: string;
};
export type GetAgentsApiResponse = /** status 200 AIエージェント一覧 */ Agent[];
export type GetAgentsApiArg = void;
export type GetAgentsByAgentIdApiResponse =
  /** status 200 AIエージェント詳細 */ Agent;
export type GetAgentsByAgentIdApiArg = {
  agentId: string;
};
export type PostReviewsApiResponse = /** status 201 レビュー作成成功 */ Review;
export type PostReviewsApiArg = {
  createReviewRequest: CreateReviewRequest;
};
export type GetReviewsByReviewIdApiResponse =
  /** status 200 レビュー詳細 */ Review;
export type GetReviewsByReviewIdApiArg = {
  reviewId: string;
};
export type PutReviewsByReviewIdApiResponse =
  /** status 200 レビュー更新成功 */ Review;
export type PutReviewsByReviewIdApiArg = {
  reviewId: string;
  updateReviewRequest: UpdateReviewRequest;
};
export type Project = {
  id?: string;
  name?: string;
  description?: string;
  /** GitHub リポジトリURL */
  repositoryUrl?: string;
  status?: "ACTIVE" | "ARCHIVED";
  createdAt?: string;
  updatedAt?: string;
};
export type CreateProjectRequest = {
  name: string;
  description?: string;
  repositoryUrl: string;
};
export type UpdateProjectRequest = {
  name?: string;
  description?: string;
  status?: "ACTIVE" | "ARCHIVED";
};
export type Task = {
  id?: string;
  projectId?: string;
  sprintId?: string | null;
  /** 親タスクID（タスク分割時） */
  parentTaskId?: string | null;
  title?: string;
  description?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status?: "BACKLOG" | "SPRINT_BACKLOG" | "IN_PROGRESS" | "REVIEW" | "DONE";
  assignedAgentId?: string | null;
  /** ストーリーポイント（進捗可視化用） */
  storyPoint?: number | null;
  /** 成果物のパス */
  artifactPath?: string | null;
  createdAt?: string;
  updatedAt?: string;
};
export type CreateTaskRequest = {
  projectId: string;
  parentTaskId?: string;
  title: string;
  description: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  storyPoint?: number;
};
export type UpdateTaskRequest = {
  title?: string;
  description?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status?: "BACKLOG" | "SPRINT_BACKLOG" | "IN_PROGRESS" | "REVIEW" | "DONE";
  assignedAgentId?: string;
  storyPoint?: number;
  sprintId?: string;
  artifactPath?: string;
};
export type TaskExecutionResult = {
  taskId?: string;
  status?: "SUCCESS" | "FAILED" | "IN_PROGRESS";
  artifactPath?: string | null;
  /** Git commit hash */
  commitHash?: string | null;
  message?: string;
  executedAt?: string;
};
export type Sprint = {
  id?: string;
  projectId?: string;
  name?: string;
  goal?: string;
  status?: "PLANNED" | "ACTIVE" | "COMPLETED";
  startDate?: string | null;
  /** AIが自動設定（レビュータイミング） */
  endDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
};
export type CreateSprintRequest = {
  projectId: string;
  name: string;
  goal: string;
  startDate?: string;
};
export type UpdateSprintRequest = {
  name?: string;
  goal?: string;
  status?: "PLANNED" | "ACTIVE" | "COMPLETED";
  endDate?: string;
};
export type BurndownChart = {
  sprintId?: string;
  dataPoints?: {
    date?: string;
    remainingStoryPoints?: number;
    idealStoryPoints?: number;
  }[];
};
export type Agent = {
  id?: string;
  name?: string;
  role?: "PRODUCT_OWNER" | "SCRUM_MASTER" | "DEVELOPER" | "REVIEWER" | "QA";
  /** AI提供元（例：GitHub Copilot） */
  aiProvider?: string;
  status?: "ACTIVE" | "INACTIVE";
  createdAt?: string;
};
export type Review = {
  id?: string;
  sprintId?: string;
  /** レビュー実施者（人間）のID */
  reviewerId?: string;
  /** 成果物の評価（1-5） */
  rating?: number;
  comment?: string;
  /** 承認フラグ */
  approved?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
export type CreateReviewRequest = {
  sprintId: string;
  reviewerId: string;
  rating: number;
  comment?: string;
  approved: boolean;
};
export type UpdateReviewRequest = {
  rating?: number;
  comment?: string;
  approved?: boolean;
};
export const {
  useGetProjectsQuery,
  usePostProjectsMutation,
  useGetProjectsByProjectIdQuery,
  usePutProjectsByProjectIdMutation,
  useDeleteProjectsByProjectIdMutation,
  useGetProjectsByProjectIdBacklogQuery,
  usePostTasksMutation,
  useGetTasksByTaskIdQuery,
  usePutTasksByTaskIdMutation,
  useDeleteTasksByTaskIdMutation,
  usePostTasksByTaskIdSplitMutation,
  usePostTasksByTaskIdExecuteMutation,
  useGetSprintsQuery,
  usePostSprintsMutation,
  useGetSprintsBySprintIdQuery,
  usePutSprintsBySprintIdMutation,
  usePostSprintsBySprintIdPlanMutation,
  useGetSprintsBySprintIdTasksQuery,
  useGetSprintsBySprintIdBurndownQuery,
  useGetAgentsQuery,
  useGetAgentsByAgentIdQuery,
  usePostReviewsMutation,
  useGetReviewsByReviewIdQuery,
  usePutReviewsByReviewIdMutation,
} = injectedRtkApi;
