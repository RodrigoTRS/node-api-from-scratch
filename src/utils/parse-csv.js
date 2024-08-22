export function parseCsv(csvString) {
    const arr = []
    const rows = csvString.trim().split("\n")
    const headers = rows[0].split(",")
    for (const row in rows) {
        const values = rows[row].split(",")
        const obj = {}
        for (const field in headers) {
            obj[headers[field]] = values[field]    
        }
        arr.push(obj)
    }
    arr.shift() // removes the header
    return arr
}