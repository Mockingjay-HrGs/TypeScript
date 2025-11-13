"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.listTasks = listTasks;
exports.deleteTask = deleteTask;
exports.updateTask = updateTask;
exports.markStatus = markStatus;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
// Le fichier de stockage des tâches (dans src/data)
const dataPath = node_path_1.default.resolve("src/data/tasks.json");
/**
 * Crée src/data/tasks.json avec un tableau vide si besoin.
 */
function ensureStore() {
    const dir = node_path_1.default.dirname(dataPath);
    // Crée le dossier s'il n'existe pas
    if (!node_fs_1.default.existsSync(dir)) {
        node_fs_1.default.mkdirSync(dir, { recursive: true });
    }
    // Crée le fichier vide si inexistant
    if (!node_fs_1.default.existsSync(dataPath)) {
        node_fs_1.default.writeFileSync(dataPath, "[]", "utf-8");
    }
    // Si le fichier est vide, on initialise un tableau JSON
    const content = node_fs_1.default.readFileSync(dataPath, "utf-8").trim();
    if (content === "") {
        node_fs_1.default.writeFileSync(dataPath, "[]", "utf-8");
    }
}
/**
 * Charge les tâches depuis le fichier JSON.
 */
function loadTasks() {
    ensureStore();
    const raw = node_fs_1.default.readFileSync(dataPath, "utf-8");
    try {
        return JSON.parse(raw, (key, value) => key === "createdAt" ? new Date(value) : value);
    }
    catch (e) {
        console.error("Erreur de lecture du fichier JSON :", e);
        node_fs_1.default.writeFileSync(dataPath, "[]", "utf-8");
        return [];
    }
}
/**
 * Sauvegarde la liste des tâches dans le JSON.
 */
function saveTasks(tasks) {
    ensureStore();
    node_fs_1.default.writeFileSync(dataPath, JSON.stringify(tasks, null, 2), "utf-8");
}
/**
 * Crée.
 */
function createTask(title, description = "") {
    const tasks = loadTasks();
    const newTask = {
        id: Date.now(),
        title,
        description,
        status: "todo",
        createdAt: new Date(),
    };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
}
/**
 * Liste toutes les tâches.
 */
function listTasks(filter) {
    const tasks = loadTasks();
    return filter ? tasks.filter((t) => t.status === filter) : tasks;
}
/**
 * Supprime une tâche selon son ID.
 */
function deleteTask(id) {
    const tasks = loadTasks();
    const updated = tasks.filter((t) => t.id !== id);
    const deleted = updated.length < tasks.length;
    if (deleted)
        saveTasks(updated);
    return deleted;
}
/**
 * Met à jour une tâche (titre, description, statut).
 */
function updateTask(id, patch) {
    const tasks = loadTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1)
        return undefined;
    const updated = Object.assign(Object.assign({}, tasks[index]), patch);
    tasks[index] = updated;
    saveTasks(tasks);
    return updated;
}
/**
 * Change uniquement le statut d'une tâche.
 */
function markStatus(id, status) {
    return updateTask(id, { status });
}
