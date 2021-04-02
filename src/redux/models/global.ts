import {Model} from "../data";

export interface GlobalStateType {
  collapsed?: boolean;
  theme?: string;
}

const globalModel: Model<GlobalStateType> = {
  namespace: 'global',
  state: {collapsed: false, theme: 'dark'},
  effects: {}
  ,
  reducers: {
    setCollapsed(state: any, action: { type: string, payload: { value?: boolean } }) {
      return {...state, collapsed: action.payload?.value}
    },
    setTheme(state: any, action: { type: string, payload: { value?: string } }) {
      return {...state, theme: action.payload?.value}
    },
  }
}

export default globalModel;
