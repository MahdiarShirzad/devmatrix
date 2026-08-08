import mongoose, { Document, Schema, Types } from "mongoose";
import { create } from "node:domain";

export interface ICollection extends Document {
  name: string;
  userId: Types.ObjectId;
  env: "Local" | "Development" | "Production";
  baseUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const collectionSchema = new Schema<ICollection>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    env: {
      type: String,
      enum: ["Local", "Development", "Production"],
      required: true,
    },
    baseUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

collectionSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<ICollection>("Collection", collectionSchema);
