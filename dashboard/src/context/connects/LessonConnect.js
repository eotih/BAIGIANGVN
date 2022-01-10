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
} from '../actions/LessonAction';
import axios from '../../constants/axios';
import { configNormal } from '../ConfigHeader';

const getLesson = async (dispatch) => {
  dispatch(getLessonStart());
  try {
    const { data } = await axios.get('/lesson', configNormal);
    dispatch(getLessonSuccess(data));
  } catch (error) {
    dispatch(getLessonFailure(error));
  }
};
const createLesson = async (dispatch, lesson) => {
  dispatch(createLessonStart());
  try {
    const { data } = await axios.post('/lesson', lesson, configNormal);
    dispatch(createLessonSuccess(data));
  } catch (error) {
    dispatch(createLessonFailure(error.response.data.message));
  }
};
const updateLesson = async (dispatch, lesson) => {
  dispatch(updateLessonStart());
  try {
    const { data } = await axios.put(`/lesson/${lesson._id}`, lesson, configNormal);
    dispatch(updateLessonSuccess(data));
  } catch (error) {
    dispatch(updateLessonFailure(error.response.data.message));
  }
};
const deleteLesson = async (dispatch, lesson) => {
  dispatch(deleteLessonStart());
  try {
    const { data } = await axios.delete(`/lesson/${lesson}`, configNormal);
    dispatch(deleteLessonSuccess(data));
  } catch (error) {
    dispatch(deleteLessonFailure(error.response.data.message));
  }
};
const getLessonNotInCombo = async (dispatch) => {
  dispatch(getLessonStart());
  try {
    const { data } = await axios.get('/lesson/not-in', configNormal);
    dispatch(getLessonSuccess(data));
  } catch (error) {
    dispatch(getLessonFailure(error));
  }
};
export { getLesson, createLesson, updateLesson, deleteLesson, getLessonNotInCombo };
