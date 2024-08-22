import { TasksRepository } from "../repositories/tasks-repository.js"

export async function fetchTasks(req, res) {
    const response = await TasksRepository.fetchAll()
    const tasks = response.rows

    res
    .writeHead(200)
    .end(
        JSON.stringify(tasks)
    )
}