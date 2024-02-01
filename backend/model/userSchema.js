const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

// userSchema.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password, 12);
// });
// console.log(userSchema);

const User = mongoose.model("User", userSchema);

module.exports = User;
