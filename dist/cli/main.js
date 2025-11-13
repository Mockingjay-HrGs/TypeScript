import { createTask, listTasks, deleteTask, updateTask, markStatus } from "../services/taskService.js";
const [, , command, ...args] = process.argv;
function help() {
    console.log(`Usage:
  create <title> [description]     Crée une tâche
  list [status]                    Liste (status: todo|in-progress|done)
  delete <id>                      Supprime une tâche
  update <id> [--title T] [--desc D] [--status S]
                                   Met à jour une tâche
  mark <id> <status>               Change le statut
  help                             Aide`);
}
switch (command) {
    case "create": {
        const title = args[0];
        const description = args.slice(1).join(" ") || "";
        if (!title) {
            console.log("Titre manquant.");
            help();
            process.exit(1);
        }
        const t = createTask(title, description);
        console.log("Tâche créée :", t);
        break;
    }
    case "list": {
        const status = args[0];
        const tasks = listTasks(status);
        console.table(tasks);
        break;
    }
    case "delete": {
        const id = Number(args[0]);
        if (!id) {
            console.log("ID manquant.");
            help();
            process.exit(1);
        }
        console.log(deleteTask(id) ? "Tâche supprimée." : "ID introuvable.");
        break;
    }
    case "update": {
        const id = Number(args[0]);
        if (!id) {
            console.log("ID manquant.");
            help();
            process.exit(1);
        }
        const titleIdx = args.indexOf("--title");
        const descIdx = args.indexOf("--desc");
        const statIdx = args.indexOf("--status");
        const patch = {};
        if (titleIdx !== -1 && args[titleIdx + 1])
            patch.title = args[titleIdx + 1];
        if (descIdx !== -1 && args[descIdx + 1])
            patch.description = args[descIdx + 1];
        if (statIdx !== -1 && args[statIdx + 1])
            patch.status = args[statIdx + 1];
        const updated = updateTask(id, patch);
        console.log(updated ? "Tâche mise à jour :" : "ID introuvable.", updated ?? "");
        break;
    }
    case "mark": {
        const id = Number(args[0]);
        const status = args[1];
        if (!id || !status) {
            console.log("Usage: mark <id> <todo|in-progress|done>");
            process.exit(1);
        }
        const updated = markStatus(id, status);
        console.log(updated ? "Statut mis à jour :" : "ID introuvable.", updated ?? "");
        break;
    }
    case "help":
    case undefined:
    default:
        help();
}
