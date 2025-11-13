import type { Task, Status } from "../models/task.js";
export declare function createTask(title: string, description?: string): Task;
export declare function listTasks(filter?: Status): Task[];
export declare function deleteTask(id: number): boolean;
//# sourceMappingURL=taskService.d.ts.map