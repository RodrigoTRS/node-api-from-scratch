import fs from "fs"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { parseCsv } from "../utils/parse-csv.js";
import { TasksRepository } from "../repositories/tasks-repository.js"



export async function importTasks(req, res) {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const buffer = fs.readFileSync(`${__dirname}/../../temp/import.csv`)
    const csvData = buffer.toString()
    const receivedTasks = parseCsv(csvData)

    const promises = receivedTasks.map((task) => {
        return TasksRepository.create({
            title: task.title,
            description: task.description
        })
    })

    await Promise.all(promises)

    return res.writeHead(200).end()
}