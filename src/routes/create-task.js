import { TasksRepository } from "../repositories/tasks-repository.js"

export async function createTask(req, res) {
    const { title, description } = req.body

    if (!title) {
        return res
        .writeHead(400)
        .end(JSON.stringify({ message: "title required"}))
    }

    const response = await TasksRepository.create({
        title,
        description
    })

    const task = response.rows

    return res
    .writeHead(201)
    .end(JSON.stringify(task))
}