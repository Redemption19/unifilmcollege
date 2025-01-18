import { courseData } from '@/lib/course-data';
import connectDB from '@/lib/mongodb';
import Course from '@/models/course';
import slugify from 'slugify';

async function seedCourses() {
  try {
    await connectDB();

    // Clear existing courses
    await Course.deleteMany({});

    // Map and create new courses
    const courses = courseData.map(course => ({
      ...course,
      slug: slugify(course.title, { lower: true })
    }));

    await Course.insertMany(courses);
    console.log('Courses seeded successfully!');
  } catch (error) {
    console.error('Error seeding courses:', error);
  }
  process.exit();
}

seedCourses(); 