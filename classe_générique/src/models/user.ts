import { Identifiable } from "./identifiable";

export interface User extends Identifiable {
    name: string;
    age: number;
}
