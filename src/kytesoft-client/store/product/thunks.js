import { productCommentServices } from '@/kytesoft-client/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, map } from 'lodash';
import {
  initLoading,
  setComments,
  setLoadingComments,
  setReplyComments,
  setReplyCommentsLoading,
} from './slice';

export const getCommentsThunk = createAsyncThunk(
  'product/comments',
  async ({ id, page, limit, isInit, isLoadMore }, { dispatch }) => {
    try {
      dispatch(setLoadingComments({ init: isInit, loadMore: isLoadMore }));
      const resp = await productCommentServices.getComments({ page, limit, id });
      const comments = map(resp.items, (item) => ({
        ...item,
        replies: [],
        loadingReplies: { ...initLoading },
        totalReplies: 0,
        hasMoreReplies: false,
        page: 0,
        errorReplies: {},
      }));
      const total = get(resp, 'total') || 0;
      dispatch(setComments({ comments, total, isInit, isLoadMore, page }));
    } catch (error) {}
    dispatch(setLoadingComments({ init: false, loadMore: false }));
  },
);

export const getReplyCommentsThunk = createAsyncThunk(
  'product/getReplyComments',
  async ({ commentId, page, limit, isInit, isLoadMore }, { dispatch }) => {
    try {
      dispatch(setReplyCommentsLoading({ init: isInit, loadMore: isLoadMore }));
      const resp = await productCommentServices.getReplyComments({
        commentId,
        page,
        limit,
      });
      const replies = get(resp, 'items') || [];
      const total = get(resp, 'total') || 0;
      dispatch(setReplyComments({ commentId, replies, total, isInit, isLoadMore, page }));
    } catch (error) {
      dispatch(setReplyCommentsLoading({ commentId, init: false, loadMore: false }));
    }
  },
);

export const createCommentThunk = createAsyncThunk(
  'product/createComment',
  async (data, { rejectWithValue }) => {
    try {
      return await productCommentServices.createComment(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
