import Course from '../models/Course.model.js';
import { errorHandler } from '../utils/errorHandle.js';


export  async function createCourse(req, res) {
        try {
            const { title, description, duration } = req.body;
            const newCourse = new Course({ title, description, duration });
            await newCourse.save();
            res.status(201).json(newCourse);
        } catch (error) {
            errorHandler(res, error);
        }
    }

export  async function getCourses(req, res) {
        try {
            const courses = await Course.find();
            res.status(200).json(courses);
        } catch (error) {
            errorHandler(res, error);
        }
    }

export  async function getCourseById(req, res) {
        try {
            const { id } = req.params;
            const course = await Course.findById(id);
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(200).json(course);
        } catch (error) {
            errorHandler(res, error);
        }
    }

export  async function updateCourse(req, res) {
        try {
            const { id } = req.params;
            const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedCourse) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(200).json(updatedCourse);
        } catch (error) {
            errorHandler(res, error);
        }
    }

export  async function deleteCourse(req, res) {
        try {
            const { id } = req.params;
            const deletedCourse = await Course.findByIdAndDelete(id);
            if (!deletedCourse) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(204).send();
        } catch (error) {
            errorHandler(res, error);
        }
    }

