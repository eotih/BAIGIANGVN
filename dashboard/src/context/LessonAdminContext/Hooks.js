/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import { LessonContext } from './LessonContext';

export const lessonContext = () => {
  const { lesson, dispatch, error, loading } = useContext(LessonContext);
  return { lesson, dispatch, error, loading };
};
