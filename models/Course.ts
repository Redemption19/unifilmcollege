import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  modules: {
    type: [String],
    default: [],
  },
  learningOutcomes: {
    type: [String],
    default: [],
  },
  careerPath: {
    type: String,
    default: "",
  }
}, {
  timestamps: true
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema); 