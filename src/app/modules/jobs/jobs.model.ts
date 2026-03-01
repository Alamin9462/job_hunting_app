import { Schema, model, Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  created_at: Date;
}

const jobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export const Job = model<IJob>('Job', jobSchema);
