import {
  selectComments,
  selectFilter,
  selectHasMoreComments,
  selectLoadingComments,
  selectTotalComments,
} from '@/kytesoft-client/store/blog/slice';
import {
  createCommentThunk,
  getCommentsThunk,
  getReplyCommentsThunk,
} from '@/kytesoft-client/store/blog/thunks';
import { useFormik } from 'formik';
import { find, get } from 'lodash';
import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const commentSchema = (messages) =>
  Yup.object().shape({
    content: Yup.string().required(get(messages, 'content.required')),
  });

export const useBlogComments = ({ id, messages = {} }) => {
  const dispatch = useDispatch();

  const idRef = useRef(null);

  const comments = useSelector(selectComments);
  const loadingComments = useSelector(selectLoadingComments);
  const filter = useSelector(selectFilter);
  const totalComments = useSelector(selectTotalComments);
  const hasMoreComments = useSelector(selectHasMoreComments);

  useLayoutEffect(() => {
    if (idRef.current === id) return;

    idRef.current = id;
    dispatch(getCommentsThunk({ id, isInit: true }));
  }, [dispatch, id]);

  const handleLoadMoreComments = ({ id }) => {
    if (!hasMoreComments) return;
    dispatch(getCommentsThunk({ id, isLoadMore: true, ...filter, page: filter.page + 1 }));
  };

  const handleLoadReplyComments = ({ id }) => {
    dispatch(getReplyCommentsThunk({ commentId: id, isInit: true }));
  };

  const handleLoadMoreReplyComments = ({ id }) => {
    const comment = find(comments, { id });
    const { page, hasMoreReplies } = comment;
    if (!hasMoreReplies) return;
    dispatch(getReplyCommentsThunk({ commentId: id, isLoadMore: true, page: page + 1 }));
  };

  const [isReply, setIsReply] = useState(false);
  const [commentId, setCommentId] = useState(null);

  const commentForm = useFormik({
    initialValues: { content: '' },
    validationSchema: commentSchema(messages),
    onSubmit: async ({ content }, { setSubmitting }) => {
      await dispatch(createCommentThunk({ id, content, isReply, commentId }));
      setSubmitting(false);
    },
  });

  const handleReplyForm = (commentId) => {
    setIsReply(true);
    setCommentId(commentId);
  };

  return {
    comments,
    loadingComments,
    filter,
    totalComments,
    hasMoreComments,
    handleLoadMoreComments,
    handleLoadReplyComments,
    handleLoadMoreReplyComments,
    commentForm,
    handleReplyForm,
  };
};
