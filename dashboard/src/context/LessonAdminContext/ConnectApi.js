import {
  getLessonStart,
  getLessonSuccess,
  getLessonFailure,
  createLessonStart,
  createLessonSuccess,
  createLessonFailure,
  updateLessonStart,
  updateLessonSuccess,
  updateLessonFailure,
  deleteLessonStart,
  deleteLessonSuccess,
  deleteLessonFailure
} from './LessonAction';
import axios from '../../constants/axios';
import { configNormal } from '../ConfigHeader';

const getLesson = async (dispatch) => {
  dispatch(getLessonStart());
  try {
    const lesson = await axios.get('/lesson', configNormal);
    dispatch(getLessonSuccess(lesson.data));
  } catch (error) {
    dispatch(getLessonFailure(error));
  }
};
const createLesson = async (dispatch, lesson) => {
  dispatch(createLessonStart());
  try {
    const newLesson = await axios.post('/auth/register', lesson);
    dispatch(createLessonSuccess(newLesson.data));
  } catch (error) {
    dispatch(createLessonFailure(error.response.data.message));
  }
};
const updateLesson = async (dispatch, lesson) => {
  dispatch(updateLessonStart());
  try {
    const updatedLesson = await axios.put(`/lesson/${lesson._id}`, lesson, configNormal);
    dispatch(updateLessonSuccess(updatedLesson.data));
  } catch (error) {
    dispatch(updateLessonFailure(error.response.data.message));
  }
};
const deleteLesson = async (dispatch, lesson) => {
  dispatch(deleteLessonStart());
  try {
    const deletedLesson = await axios.delete(`/lesson/${lesson}`, configNormal);
    dispatch(deleteLessonSuccess(deletedLesson.data));
  } catch (error) {
    dispatch(deleteLessonFailure(error.response.data.message));
  }
};

export { getLesson, createLesson, updateLesson, deleteLesson };
