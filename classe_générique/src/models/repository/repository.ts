import { Identifiable } from "../identifiable";

export class Repository<T extends Identifiable> {
    private data: T[] = [];

    add(item: T): void {
        this.data.push(item);
    }

    getById(id: string | number): T | undefined {
        return this.data.find(item => item.id === id);
    }

    update(id: string | number, newItem: T): boolean {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1) return false;

        this.data[index] = newItem;
        return true;
    }

    delete(id: string | number): boolean {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1) return false;

        this.data.splice(index, 1);
        return true;
    }

    getAll(): T[] {
        return [...this.data];
    }
}
