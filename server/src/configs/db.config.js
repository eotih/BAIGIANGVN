const mongoose = require('mongoose');

async function connectDatabase() {
    const {MONGO_HOST,MONGO_PORT,MONGO_DB} = process.env;
    const mongoDbUrl = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
    console.log(mongoDbUrl);
    try {
        await mongoose.connect(mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: true,
        });
        console.log('Successfully connected to the database')
    } catch (error) {
        console.log(`Could not connect to the database. Exiting now... \n${error}`);
    }
}

module.exports = { connectDatabase }