import { v7 as uuidv7 } from 'uuid';

export enum TaskStatus {
  BACKLOG = 'BACKLOG',
  SPRINT_BACKLOG = 'SPRINT_BACKLOG',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface TaskProps {
  id: string;
  projectId: string;
  sprintId: string | null;
  parentTaskId: string | null;
  title: string;
  description: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  assignedAgentId: string | null;
  storyPoint: number | null;
  artifactPath: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Task {
  private constructor(private readonly props: TaskProps) {}

  static create(
    props: Omit<TaskProps, 'id' | 'createdAt' | 'updatedAt'>,
  ): Task {
    return new Task({
      ...props,
      id: uuidv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static reconstruct(props: TaskProps): Task {
    return new Task(props);
  }

  get id(): string {
    return this.props.id;
  }

  get projectId(): string {
    return this.props.projectId;
  }

  get sprintId(): string | null {
    return this.props.sprintId;
  }

  get parentTaskId(): string | null {
    return this.props.parentTaskId;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | null {
    return this.props.description;
  }

  get priority(): TaskPriority {
    return this.props.priority;
  }

  get status(): TaskStatus {
    return this.props.status;
  }

  get assignedAgentId(): string | null {
    return this.props.assignedAgentId;
  }

  get storyPoint(): number | null {
    return this.props.storyPoint;
  }

  get artifactPath(): string | null {
    return this.props.artifactPath;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateTitle(title: string): Task {
    return new Task({
      ...this.props,
      title,
      updatedAt: new Date(),
    });
  }

  updateDescription(description: string | null): Task {
    return new Task({
      ...this.props,
      description,
      updatedAt: new Date(),
    });
  }

  updatePriority(priority: TaskPriority): Task {
    return new Task({
      ...this.props,
      priority,
      updatedAt: new Date(),
    });
  }

  updateStatus(status: TaskStatus): Task {
    return new Task({
      ...this.props,
      status,
      updatedAt: new Date(),
    });
  }

  assignToSprint(sprintId: string): Task {
    return new Task({
      ...this.props,
      sprintId,
      status: TaskStatus.SPRINT_BACKLOG,
      updatedAt: new Date(),
    });
  }

  removeFromSprint(): Task {
    return new Task({
      ...this.props,
      sprintId: null,
      status: TaskStatus.BACKLOG,
      updatedAt: new Date(),
    });
  }

  assignAgent(agentId: string): Task {
    return new Task({
      ...this.props,
      assignedAgentId: agentId,
      updatedAt: new Date(),
    });
  }

  unassignAgent(): Task {
    return new Task({
      ...this.props,
      assignedAgentId: null,
      updatedAt: new Date(),
    });
  }

  updateStoryPoint(storyPoint: number | null): Task {
    return new Task({
      ...this.props,
      storyPoint,
      updatedAt: new Date(),
    });
  }

  updateArtifactPath(artifactPath: string | null): Task {
    return new Task({
      ...this.props,
      artifactPath,
      updatedAt: new Date(),
    });
  }

  startProgress(): Task {
    return new Task({
      ...this.props,
      status: TaskStatus.IN_PROGRESS,
      updatedAt: new Date(),
    });
  }

  moveToReview(): Task {
    return new Task({
      ...this.props,
      status: TaskStatus.REVIEW,
      updatedAt: new Date(),
    });
  }

  complete(): Task {
    return new Task({
      ...this.props,
      status: TaskStatus.DONE,
      updatedAt: new Date(),
    });
  }
}
