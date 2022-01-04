const LessonReducer = (state, action) => {
  switch (action.type) {
    case 'GET_LESSON_START':
      return {
        lesson: [],
        loading: true,
        error: null
      };
    case 'GET_LESSON_SUCCESS':
      return {
        loading: false,
        lesson: action.lesson
      };
    case 'GET_LESSON_FAILURE':
      return {
        lesson: [],
        loading: false,
        error: action.error
      };
    case 'CREATE_LESSON_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'CREATE_LESSON_SUCCESS':
      return {
        loading: false,
        message: action.message,
        lesson: [...state.lesson, action.lesson]
      };
    case 'CREATE_LESSON_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'UPDATE_LESSON_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'UPDATE_LESSON_SUCCESS':
      return {
        lesson: state.lesson.map((lesson) =>
          lesson._id === action.lesson._id ? action.lesson : lesson
        ),
        message: action.message,
        loading: false,
        error: null
      };
    case 'UPDATE_LESSON_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'DELETE_LESSON_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'DELETE_LESSON_SUCCESS':
      return {
        lesson: state.lesson.filter((lesson) => lesson._id !== action.lesson.lesson._id),
        message: action.message,
        loading: false,
        error: null
      };
    case 'DELETE_LESSON_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
export default LessonReducer;
