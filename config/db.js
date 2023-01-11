const mongoose = require('mongoose');
const HttpError = require('../utils/httpError');

exports.connectDB = async () => {
  const con = await mongoose.connect(
    'mongodb+srv://dance:ifyoucan@cluster0.pecieuq.mongodb.net/upgradretail?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );
  console.log(`mongoDB Connected ${con.connection.host}`);
};
