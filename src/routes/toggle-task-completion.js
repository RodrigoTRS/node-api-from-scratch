import { TasksRepository } from "../repositories/tasks-repository.js"

export async function toggleTaskCompletion(req, res) {
    const { id } = req.params

    const response = await TasksRepository.toggleCompletion(id)

    if (response.rowCount === 0) {
        return res
        .writeHead(404)
        .end(JSON.stringify({ message: "resource not found" }))
    }

    const task = response.rows

    return res
    .writeHead(204)
    .end(JSON.stringify(task))
}