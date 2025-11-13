export type Status = "todo" | "in-progress" | "done";

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: Status;
    createdAt: Date;
}

export type TaskUpdate = Partial<Pick<Task, "title" | "description" | "status">>;
