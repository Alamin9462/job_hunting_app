import { Schema, model, Document } from 'mongoose';

export interface IApplication extends Document {
  job_id: Schema.Types.ObjectId;
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
  created_at: Date;
}

const applicationSchema = new Schema<IApplication>({
  job_id: { type: Schema.Types.ObjectId, required: true, ref: 'Job' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  resume_link: { type: String, required: true },
  cover_note: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
});

export const Application = model<IApplication>('Application', applicationSchema);
