const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Blog_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect Sussesful!!');
    } catch (error) {
        console.log('Error');
    }
}

module.exports = { connect };