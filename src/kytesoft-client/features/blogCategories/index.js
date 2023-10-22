import { blogCategoryServices } from '@/kytesoft-client/services';
import { useQuery } from '@tanstack/react-query';

export const getBlogCategoriesQueryConfig = ({ options = {}, queryKey = {}, ...rest } = {}) => ({
  queryKey: ['/blog-categories', { ...queryKey }],
  queryFn: () => blogCategoryServices.getBlogCategories(),
  options: { retry: 1, ...options },
  ...rest,
});

export const useBlogCategoriesQuery = ({ options, ...rest } = {}) => {
  return useQuery(getBlogCategoriesQueryConfig({ options, ...rest }));
};

export const prefetchBlogCategoriesQuery = async (queryClient, options) => {
  await queryClient.prefetchQuery(getBlogCategoriesQueryConfig(options));
};
