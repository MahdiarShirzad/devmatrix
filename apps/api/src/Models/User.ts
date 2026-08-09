import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export type AuthProvider = "local" | "github";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  authProvider: AuthProvider;
  githubId?: string;
  githubAccessToken?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return this.authProvider === "local";
      },
      select: false,
    },
    avatar: {
      type: String,
    },
    authProvider: {
      type: String,
      enum: ["local", "github"],
      required: true,
      default: "local",
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
    githubAccessToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
