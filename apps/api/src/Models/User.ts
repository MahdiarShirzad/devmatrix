import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type ProjectType =
  | "api-playground"
  | "ai-debug"
  | "analytics"
  | "saas-validator"
  | "general";

export interface IProject extends Document {
  userId: Types.ObjectId;
  name: string;
  description?: string;
  type: ProjectType;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: [
        "api-playground",
        "ai-debug",
        "analytics",
        "saas-validator",
        "general",
      ],
      required: true,
      default: "general",
    },
  },
  {
    timestamps: true,
  },
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
