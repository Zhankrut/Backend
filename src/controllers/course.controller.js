import Course from '../models/Course.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';


export async function createCourse(req, res) {
    try {
        const { title, description, duration } = req.body;
        const existingCourse = await Course.findOne({ title, description, duration });
        if (existingCourse) {
            throw new ApiError(400, " the course already exist")
        }
        const newCourse = new Course({ title, description, duration });
        await newCourse.save();
        return res
            .status(200)
            .json(
                new ApiResponse(200, newCourse, "the course have successfull created")
            );
    } catch (error) {
        throw new ApiError(400, error.message);
    }
}

export async function getCourses(req, res) {
    try {
        const courses = await Course.find();
        return res
            .status(200)
            .json(
                new ApiResponse(200, courses, "the list of courses")
            );
    } catch (error) {
        throw new ApiError(400, error.message);
    }
}

export async function getCourseById(req, res) {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) {
            throw new ApiError(400, "the course does not exist");
        }
        return res
            .status(200)
            .json(
                new ApiResponse(200, course, " ")
            );

    } catch (error) {
        throw new ApiError(400, error.message);
    }
}

export async function updateCourse(req, res) {
    try {
        const { id } = req.params;
        const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCourse) {
            throw new ApiError(400, " the course not found");
        }
        return res
            .status(200)
            .json(
                new ApiResponse(200, updatedCourse, " the course updated successfully")
            );
    } catch (error) {
        throw new ApiError(400, error.message);
    }
}

export async function deleteCourse(req, res) {
    try {
        const { id } = req.params;
        const deletedCourse = await Course.findByIdAndDelete(id);
        if (!deletedCourse) {
            throw new ApiError(400, "the course not found"); v
        }
        return res
            .status(200)
            .json(
                new ApiResponse(200, deletedCourse, " the course deleted successfully")
            );
    } catch (error) {
        throw new ApiError(400, error.message);
    }
}

