import { v7 as uuidv7 } from 'uuid';

export enum BacklogItemStatus {
  BACKLOG = 'BACKLOG',
  SPRINT_BACKLOG = 'SPRINT_BACKLOG',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

export enum BacklogItemPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface BacklogItemProps {
  id: string;
  productId: string;
  sprintId: string | null;
  parentBacklogItemId: string | null;
  title: string;
  description: string | null;
  priority: BacklogItemPriority;
  status: BacklogItemStatus;
  assignedAgentId: string | null;
  storyPoint: number | null;
  artifactPath: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class BacklogItem {
  private constructor(private readonly props: BacklogItemProps) {}

  static create(
    props: Omit<BacklogItemProps, 'id' | 'createdAt' | 'updatedAt'>,
  ): BacklogItem {
    return new BacklogItem({
      ...props,
      id: uuidv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static reconstruct(props: BacklogItemProps): BacklogItem {
    return new BacklogItem(props);
  }

  get id(): string {
    return this.props.id;
  }

  get productId(): string {
    return this.props.productId;
  }

  get sprintId(): string | null {
    return this.props.sprintId;
  }

  get parentBacklogItemId(): string | null {
    return this.props.parentBacklogItemId;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | null {
    return this.props.description;
  }

  get priority(): BacklogItemPriority {
    return this.props.priority;
  }

  get status(): BacklogItemStatus {
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

  updateTitle(title: string): BacklogItem {
    return new BacklogItem({
      ...this.props,
      title,
      updatedAt: new Date(),
    });
  }

  updateDescription(description: string | null): BacklogItem {
    return new BacklogItem({
      ...this.props,
      description,
      updatedAt: new Date(),
    });
  }

  updatePriority(priority: BacklogItemPriority): BacklogItem {
    return new BacklogItem({
      ...this.props,
      priority,
      updatedAt: new Date(),
    });
  }

  updateStatus(status: BacklogItemStatus): BacklogItem {
    return new BacklogItem({
      ...this.props,
      status,
      updatedAt: new Date(),
    });
  }

  assignToSprint(sprintId: string): BacklogItem {
    return new BacklogItem({
      ...this.props,
      sprintId,
      status: BacklogItemStatus.SPRINT_BACKLOG,
      updatedAt: new Date(),
    });
  }

  removeFromSprint(): BacklogItem {
    return new BacklogItem({
      ...this.props,
      sprintId: null,
      status: BacklogItemStatus.BACKLOG,
      updatedAt: new Date(),
    });
  }

  assignAgent(agentId: string): BacklogItem {
    return new BacklogItem({
      ...this.props,
      assignedAgentId: agentId,
      updatedAt: new Date(),
    });
  }

  unassignAgent(): BacklogItem {
    return new BacklogItem({
      ...this.props,
      assignedAgentId: null,
      updatedAt: new Date(),
    });
  }

  updateStoryPoint(storyPoint: number | null): BacklogItem {
    return new BacklogItem({
      ...this.props,
      storyPoint,
      updatedAt: new Date(),
    });
  }

  updateArtifactPath(artifactPath: string | null): BacklogItem {
    return new BacklogItem({
      ...this.props,
      artifactPath,
      updatedAt: new Date(),
    });
  }

  startProgress(): BacklogItem {
    return new BacklogItem({
      ...this.props,
      status: BacklogItemStatus.IN_PROGRESS,
      updatedAt: new Date(),
    });
  }

  moveToReview(): BacklogItem {
    return new BacklogItem({
      ...this.props,
      status: BacklogItemStatus.REVIEW,
      updatedAt: new Date(),
    });
  }

  complete(): BacklogItem {
    return new BacklogItem({
      ...this.props,
      status: BacklogItemStatus.DONE,
      updatedAt: new Date(),
    });
  }
}
