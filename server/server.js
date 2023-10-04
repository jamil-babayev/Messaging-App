const app = require('./app');
const mongoose = require('mongoose');

require('dotenv').config();
const { PORT, MONGODB_URL } = process.env;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection established');
    app.listen(PORT, () =>
      console.log(`Listening on http://localhost/${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
