import { Project } from '../model/project.entity';

export interface ProjectRepository {
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
  save(project: Project): Promise<Project>;
  update(project: Project): Promise<Project>;
  delete(id: string): Promise<void>;
}

export const PROJECT_REPOSITORY = Symbol('PROJECT_REPOSITORY');
