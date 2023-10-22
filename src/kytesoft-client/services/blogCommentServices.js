import { PAGE_SIZE } from '../features/constants';
import { privateRequest, publicRequest } from '../request';

const blogCommentServices = {
  getComments: ({ id, page = 1, limit = PAGE_SIZE }) => {
    return publicRequest.request({
      method: 'GET',
      url: `/blogs/${id}/comments`,
      params: { page, limit },
    });
  },

  getReplyComments: ({ commentId, page, limit }) => {
    return publicRequest.request({
      method: 'GET',
      url: `/blog-comments/${commentId}/replies`,
      params: { page, limit },
    });
  },

  createComment: ({ id, commentId, isReply, content }) => {
    return privateRequest.request({
      method: 'POST',
      url: isReply ? `/blog-comments/${commentId}/replies` : `/blogs/${id}/comments`,
      data: { content },
    });
  },
};

export default blogCommentServices;
