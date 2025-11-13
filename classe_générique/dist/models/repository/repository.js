"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
class Repository {
    constructor() {
        this.data = [];
    }
    add(item) {
        this.data.push(item);
    }
    getById(id) {
        return this.data.find(item => item.id === id);
    }
    update(id, newItem) {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1)
            return false;
        this.data[index] = newItem;
        return true;
    }
    delete(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1)
            return false;
        this.data.splice(index, 1);
        return true;
    }
    getAll() {
        return [...this.data];
    }
}
exports.Repository = Repository;
