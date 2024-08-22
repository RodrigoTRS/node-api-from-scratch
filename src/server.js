import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    // Ignore Favicon request
    if (url === "/favicon.ico") {
        return res.writeHead(204).end();
    }

    // Parse JSON
    await json(req, res)

    const route = routes.find((route) => {
        return route.method === method && route.path.test(url)
    })

    if (!route) {
        return res.writeHead(404).end(JSON.stringify({ message: "route doesn't exists" }))
    }

    const routeParams = req.url.match(route.path)
    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return await route.handler(req, res)

})

server.listen(3333)