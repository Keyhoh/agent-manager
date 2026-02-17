import { v7 as uuidv7 } from 'uuid';

export enum SprintStatus {
  PLANNED = 'PLANNED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export interface SprintProps {
  id: string;
  projectId: string;
  name: string;
  goal: string | null;
  status: SprintStatus;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Sprint {
  private constructor(private readonly props: SprintProps) {}

  static create(
    props: Omit<SprintProps, 'id' | 'createdAt' | 'updatedAt'>,
  ): Sprint {
    return new Sprint({
      ...props,
      id: uuidv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static reconstruct(props: SprintProps): Sprint {
    return new Sprint(props);
  }

  get id(): string {
    return this.props.id;
  }

  get projectId(): string {
    return this.props.projectId;
  }

  get name(): string {
    return this.props.name;
  }

  get goal(): string | null {
    return this.props.goal;
  }

  get status(): SprintStatus {
    return this.props.status;
  }

  get startDate(): Date | null {
    return this.props.startDate;
  }

  get endDate(): Date | null {
    return this.props.endDate;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateName(name: string): Sprint {
    return new Sprint({
      ...this.props,
      name,
      updatedAt: new Date(),
    });
  }

  updateGoal(goal: string | null): Sprint {
    return new Sprint({
      ...this.props,
      goal,
      updatedAt: new Date(),
    });
  }

  start(startDate: Date, endDate: Date): Sprint {
    return new Sprint({
      ...this.props,
      status: SprintStatus.ACTIVE,
      startDate,
      endDate,
      updatedAt: new Date(),
    });
  }

  complete(): Sprint {
    return new Sprint({
      ...this.props,
      status: SprintStatus.COMPLETED,
      updatedAt: new Date(),
    });
  }

  reopen(): Sprint {
    return new Sprint({
      ...this.props,
      status: SprintStatus.PLANNED,
      updatedAt: new Date(),
    });
  }

  updateDates(startDate: Date | null, endDate: Date | null): Sprint {
    return new Sprint({
      ...this.props,
      startDate,
      endDate,
      updatedAt: new Date(),
    });
  }
}
