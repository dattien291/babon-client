import { orderServices } from '@/kytesoft-client/services';
import { useQuery } from '@tanstack/react-query';

const geOrderQueryConfig = ({ id, options = {}, queryKey = {}, ...rest } = {}) => ({
  queryKey: ['/orders', { id, ...queryKey }],
  queryFn: () => orderServices.getOrder({ id }),
  options: { retry: 1, ...options },
  ...rest,
});

export const useOrderQuery = ({ id, options, ...rest } = {}) => {
  return useQuery(geOrderQueryConfig({ id, options, ...rest }));
};

export const prefetchOrderQuery = async (queryClient, options) => {
  await queryClient.prefetchQuery(geOrderQueryConfig(options));
};
