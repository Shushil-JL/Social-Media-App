const app = require("./app")
const { connectDatabase } = require("./config/databse")
const cloudinary = require("cloudinary")

connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
})

app.listen(process.env.PORT, () => {

    console.log(` Server is running at port ${process.env.PORT}`)

})