import mongoose from "mongoose";
import slugify from "slugify";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a course title"],
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a course description"],
  },
  duration: {
    type: String,
    required: [true, "Please provide course duration"],
  },
  image: {
    type: String,
    required: [true, "Please provide a course image"],
  },
  modules: {
    type: [String],
    required: [true, "Please provide course modules"],
  },
  learningOutcomes: {
    type: [String],
    required: [true, "Please provide learning outcomes"],
  },
  careerPath: {
    type: String,
    required: [true, "Please provide career path information"],
  },
}, {
  timestamps: true,
});

// Generate slug before saving
courseSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Add indexes for frequently queried fields
courseSchema.index({ slug: 1 });
courseSchema.index({ createdAt: -1 });

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;