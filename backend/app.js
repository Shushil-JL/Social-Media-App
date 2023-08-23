const express = require("express")
const post = require("./routes/post")
const user = require("./routes/user")
const cookieParser = require("cookie-parser")

const app = express()

if (process.env.MODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" })
}

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "20mb", extended: true }))
app.use(cookieParser())

app.use("/api/v1", post)
app.use("/api/v1", user)


module.exports = app