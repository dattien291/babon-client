export interface IAnyObject {
  [key: string]: any;
}

export interface IQueryOptionsList {
  page: number;
  limit: number;
}

export interface IQueryResultList<T> {
  items: T[];
  total: number;
}
