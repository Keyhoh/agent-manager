import { v7 as uuidv7 } from 'uuid';

export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export interface ProjectProps {
  id: string;
  name: string;
  description: string | null;
  repositoryUrl: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Project {
  private constructor(private readonly props: ProjectProps) {}

  static create(
    props: Omit<ProjectProps, 'id' | 'createdAt' | 'updatedAt'>,
  ): Project {
    return new Project({
      ...props,
      id: uuidv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static reconstruct(props: ProjectProps): Project {
    return new Project(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | null {
    return this.props.description;
  }

  get repositoryUrl(): string {
    return this.props.repositoryUrl;
  }

  get status(): ProjectStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateName(name: string): Project {
    return new Project({
      ...this.props,
      name,
      updatedAt: new Date(),
    });
  }

  updateDescription(description: string | null): Project {
    return new Project({
      ...this.props,
      description,
      updatedAt: new Date(),
    });
  }

  archive(): Project {
    return new Project({
      ...this.props,
      status: ProjectStatus.ARCHIVED,
      updatedAt: new Date(),
    });
  }

  activate(): Project {
    return new Project({
      ...this.props,
      status: ProjectStatus.ACTIVE,
      updatedAt: new Date(),
    });
  }
}
