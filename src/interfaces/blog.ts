export interface IBlog {
  id: string;
  categoryId: string;
  storeId: string;
  name: string;
  description: string;
  slug: string;
  images: string[];
  tags: string[];
  createdAt: string;
  content?: string;
}

export interface IDetailBlog extends IBlog {
  content: string;
}
