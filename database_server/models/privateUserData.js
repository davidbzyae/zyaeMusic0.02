const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reqString = {
  type: String,
  required: true,
};

const PrivateUserDataSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    immutable: true,
  },
  password: reqString,
});

PrivateUserDataSchema.plugin(require("mongoose-immutable-plugin"));

module.exports = mongoose.model("PrivateUserData", PrivateUserDataSchema);
