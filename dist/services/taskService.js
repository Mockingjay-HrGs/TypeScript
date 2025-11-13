import fs from "node:fs";
import path from "node:path";
// 📍 Le fichier de stockage des tâches (dans src/data)
const dataPath = path.resolve("src/data/tasks.json");
/**
 * S'assure que le fichier et son dossier existent.
 * Crée src/data/tasks.json avec un tableau vide si besoin.
 */
function ensureStore() {
    const dir = path.dirname(dataPath);
    // Crée le dossier s'il n'existe pas
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    // Crée le fichier vide si inexistant
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, "[]", "utf-8");
    }
    // Si le fichier est vide, on initialise un tableau JSON
    const content = fs.readFileSync(dataPath, "utf-8").trim();
    if (content === "") {
        fs.writeFileSync(dataPath, "[]", "utf-8");
    }
}
/**
 * Charge les tâches depuis le fichier JSON.
 */
function loadTasks() {
    ensureStore();
    const raw = fs.readFileSync(dataPath, "utf-8");
    try {
        return JSON.parse(raw, (key, value) => key === "createdAt" ? new Date(value) : value);
    }
    catch (e) {
        console.error("Erreur de lecture du fichier JSON :", e);
        fs.writeFileSync(dataPath, "[]", "utf-8");
        return [];
    }
}
/**
 * Sauvegarde la liste complète des tâches dans le fichier JSON.
 */
function saveTasks(tasks) {
    ensureStore();
    fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2), "utf-8");
}
/**
 * Crée une nouvelle tâche.
 */
export function createTask(title, description = "") {
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
 * Liste toutes les tâches (avec filtre optionnel par statut).
 */
export function listTasks(filter) {
    const tasks = loadTasks();
    return filter ? tasks.filter((t) => t.status === filter) : tasks;
}
/**
 * Supprime une tâche selon son ID.
 */
export function deleteTask(id) {
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
export function updateTask(id, patch) {
    const tasks = loadTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1)
        return undefined;
    const updated = { ...tasks[index], ...patch };
    tasks[index] = updated;
    saveTasks(tasks);
    return updated;
}
/**
 * Change uniquement le statut d'une tâche.
 */
export function markStatus(id, status) {
    return updateTask(id, { status });
}
