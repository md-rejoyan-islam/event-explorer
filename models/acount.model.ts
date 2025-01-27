import mongoose from "mongoose";

// Define the schema
const oauthSchema = new mongoose.Schema({
  access_token: {
    type: String,
    required: true,
  },
  id_token: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Number,
    required: true,
  },
  scope: {
    type: String,
    required: true,
  },
  token_type: {
    type: String,
    required: true,
  },
  providerAccountId: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model to reference
    required: true,
  },
});

// const User = mongoose.models.User ?? mongoose.model("User", userSchema);

// export default User;

const Account =
  mongoose.models.Account ?? mongoose.model("Account", oauthSchema);

export default Account;
