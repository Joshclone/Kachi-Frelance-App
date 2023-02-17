const mongoose = require("mongoose");
const config = require("config");
const dbConfig = config.get("dbuser.dbConfig.dbName");


const connectDB = async (app) => {
    try {
        await mongoose
            .connect(dbConfig)
            .then(() => console.log(`Connection to Database successful`))

        const port = process.env.PORT || 8000;
        app.listen(port, () => console.log(`Server is running on port ${port}`))


    } catch (e) {
        console.error(`${e} did not cpnnect to database`);

    }
}
module.exports = connectDB;
