const getLessonStart = () => ({
  type: 'GET_LESSON_START'
});
const getLessonSuccess = (lesson) => ({
  type: 'GET_LESSON_SUCCESS',
  lesson
});
const getLessonFailure = (error) => ({
  type: 'GET_LESSON_FAILURE',
  error
});
const createLessonStart = () => ({
  type: 'CREATE_LESSON_START'
});
const createLessonSuccess = (lesson) => ({
  type: 'CREATE_LESSON_SUCCESS',
  lesson
});
const createLessonFailure = (error) => ({
  type: 'CREATE_LESSON_FAILURE',
  error
});
const updateLessonStart = () => ({
  type: 'UPDATE_LESSON_START'
});
const updateLessonSuccess = (lesson) => ({
  type: 'UPDATE_LESSON_SUCCESS',
  lesson
});
const updateLessonFailure = (error) => ({
  type: 'UPDATE_LESSON_FAILURE',
  error
});
const deleteLessonStart = () => ({
  type: 'DELETE_LESSON_START'
});
const deleteLessonSuccess = (lesson) => ({
  type: 'DELETE_LESSON_SUCCESS',
  lesson
});
const deleteLessonFailure = (error) => ({
  type: 'DELETE_LESSON_FAILURE',
  error
});

export {
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
};
