import connectToDatabase from "@/lib/mongoose";
import TrainingProgram, { ITrainingProgram } from "@/lib/models/TrainingProgram";

export class TrainingRepository {
  async getAllActivePrograms(): Promise<ITrainingProgram[]> {
    await connectToDatabase();
    return TrainingProgram.find({ isActive: true }).sort({ createdAt: -1 }).lean();
  }

  async getProgramBySlug(slug: string): Promise<ITrainingProgram | null> {
    await connectToDatabase();
    return TrainingProgram.findOne({ slug, isActive: true }).lean();
  }
}

export const trainingRepository = new TrainingRepository();
