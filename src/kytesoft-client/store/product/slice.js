import { createSelector, createSlice } from '@reduxjs/toolkit';
import { concat, forEach, get, size } from 'lodash';

export const initLoading = {
  init: false,
  loadMore: false,
};

const initialState = {
  comments: [],
  totalComments: 0,
  hasMoreComments: false,
  loadingComments: { ...initLoading },
  filter: {
    page: 0,
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setLoadingComments: (state, { payload }) => {
      state.loadingComments = payload;
    },

    setComments: (state, { payload }) => {
      const { comments, total, isInit, isLoadMore, page } = payload;
      state.totalComments = total;

      if (isInit) {
        state.comments = comments;
      }
      if (isLoadMore) {
        state.comments = [...(state.comments || []), ...comments];
      }

      state.hasMoreComments = size(state.comments) < total;
      state.filter.page = page;
    },

    setReplyCommentsLoading: (state, { payload }) => {
      const { commentId, init, loadMore } = payload;
      forEach(state.comments, (comment) => {
        if (comment.id === commentId) {
          comment.loadingReplies = { init, loadMore };
        }
      });
    },

    setReplyComments: (state, { payload }) => {
      const { commentId, replies, total, isInit, isLoadMore, page } = payload;
      forEach(state.comments, (comment) => {
        if (comment.id === commentId) {
          if (isInit) comment.replies = replies;
          if (isLoadMore) comment.replies = concat(comment.replies, replies);
          comment.totalReplies = total;
          comment.hasMoreReplies = size(concat.replies) < total;
          comment.loadingReplies = { init: false, loadMore: false };
          comment.page = page;
        }
      });
    },
  },
});

export const { setLoadingComments, setComments, setReplyCommentsLoading, setReplyComments } =
  productSlice.actions;

export default productSlice;

const selectStore = (app) => app?.product;

export const selectComments = createSelector([selectStore], (state) => get(state, 'comments', []));

export const selectTotalComments = createSelector([selectStore], (state) =>
  get(state, 'totalComments', 0),
);

export const selectHasMoreComments = createSelector([selectStore], (state) =>
  get(state, 'hasMoreComments', false),
);

export const selectLoadingComments = createSelector([selectStore], (state) =>
  get(state, 'loadingComments', initLoading),
);

export const selectFilter = createSelector([selectStore], (state) => get(state, 'filter'));
