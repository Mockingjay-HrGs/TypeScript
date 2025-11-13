export type Status = "todo" | "in-progress" | "done";
export interface Task {
    id: number;
    title: string;
    description?: string;
    status: Status;
    createdAt: Date;
}
//# sourceMappingURL=task.d.ts.map