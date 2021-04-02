import {GenericResult} from "@/utils/request";

import {Effect, Reducer,} from "@/redux/data";

export interface DataSource {
  key?: string | number;
}

export interface ProStateType<D, F> {
  data: GenericResult<D[]>;
  pageSize: number;
  isHideForm: boolean;
  /**
   * form fields values
   */
  formSearch: F;
}


interface ProModel<T> {
  namespace: string;
  state?: T;
  effects?: {
    querySubmit: Effect;
    [extra: string]: Effect;
  };
  reducers?: {
    setFormSearch: Reducer<T, { type: string, payload: { dataIndex: string, value: any } }>;
    setSateProperty: Reducer<T, { type: string, payload: { dataIndex: string, value: any } }>;
  };
}

export type ProTableModelType<D, T> = D & ProModel<T>;

