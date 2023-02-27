const fs = require('fs')

const files = fs.readdirSync("./avatars")


console.log(files.map((file) => {
    return {
        name: file.replace("-svgrepo-com.svg", "").replace(/-/g, " "),
        path: file
    }
}))