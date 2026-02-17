import { ProjectStatus } from '../../../domain/model/project.entity';

export class ProjectResponse {
  id: string;
  name: string;
  description: string | null;
  repositoryUrl: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}
