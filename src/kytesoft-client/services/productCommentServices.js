import { PAGE_SIZE } from '../features/constants';
import { privateRequest, publicRequest } from '../request';

const productCommentServices = {
  getComments: ({ id, page = 1, limit = PAGE_SIZE }) => {
    return publicRequest.request({
      method: 'GET',
      url: `/products/${id}/comments`,
      params: { page, limit },
    });
  },

  getReplyComments: ({ commentId, page, limit }) => {
    return publicRequest.request({
      method: 'GET',
      url: `/product-comments/${commentId}/replies`,
      params: { page, limit },
    });
  },

  createComment: ({ id, commentId, isReply, content, images, rating }) => {
    return privateRequest.request({
      method: 'POST',
      url: isReply ? `/product-comments/${commentId}/replies` : `/products/${id}/comments`,
      data: {
        content,
        ...(!isReply && {
          images,
          rating,
        }),
      },
    });
  },
};

export default productCommentServices;
