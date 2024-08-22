import { buildRoutePath } from "./utils/build-route-path.js"

import { createTask } from "./routes/create-task.js"
import { deleteTask } from "./routes/delete-task.js"
import { fetchTasks } from "./routes/fetch-tasks.js"
import { toggleTaskCompletion } from "./routes/toggle-task-completion.js"
import { updateTask } from "./routes/update-task.js"
import { importTasks } from "./routes/import-task.js"


export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/tasks"),
        handler: fetchTasks
    },
    {
        method: "POST",
        path: buildRoutePath("/tasks"),
        handler: createTask
    },
    {
        method: "GET",
        path: buildRoutePath("/import"),
        handler: importTasks
    },
    {
        method: "PUT",
        path: buildRoutePath("/tasks/:id"),
        handler: updateTask
    },
    {
        method: "DELETE",
        path: buildRoutePath("/tasks/:id"),
        handler: deleteTask
    },
    {
        method: "PATCH",
        path: buildRoutePath("/tasks/:id"),
        handler: toggleTaskCompletion
    }
]