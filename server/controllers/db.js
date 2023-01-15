const mongoose = require("mongoose");

const dbConnection = (uri) => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfull Connection to Database!"))
    .catch((err) =>
      console.log("There was an error connecting to the database! Error: ", err)
    );
};

module.exports = dbConnection;
