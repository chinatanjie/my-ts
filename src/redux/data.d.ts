export interface Action<T = string> {
  type: T
}

export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  payload: {
    [extraProps: string]: any
  }
}

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;


export type Reducer<S = any, A extends Action > = (
    state: S | undefined,
    action: A
) => S;

export type Reducers = {
  [key: string]: Reducer;
}

export interface EffectsCommandMap {
  put: <A extends AnyAction>(action: A) => any,
  call: Function,
  select: Function,
  take: Function,
  cancel: Function,

  [key: string]: any,
}

export type Effect = (
    action: AnyAction,
    effects: EffectsCommandMap,
) => void;

export interface Model<P = any> {
  namespace: string;
  state?: P;
  effects?: {
    [key: string]: Effect;
  };
  reducers?: {
    [key: string]: Reducer<P>;
  }
}

export interface AppModels {
  models: Model[];
}