import {AnyAction, AppModels, Reducers} from "./data";
import {createStore, combineReducers, applyMiddleware} from "redux"
import createSagaMiddleware from "redux-saga"
import * as  effects from "redux-saga/effects"
import {compose} from "redux"

import globalModel from "./models/global"
import admin from "@/pages/eCard/ICCard/models/admin"
import ClassroomEdit from "@/pages/eCard/ClassroomConfig/models/ClassroomEdit";
import administrator from "@/pages/eCard/PeopleEdit/models/administrator";
import maintenance from "@/pages/eCard/PeopleEdit/models/maintenance";
import student from "@/pages/eCard/PeopleEdit/models/student";
import teacher from "@/pages/eCard/PeopleEdit/models/teacher";
import temporary from "@/pages/eCard/PeopleEdit/models/temporary";
import SwipeDoor from "@/pages/eCard/log/models/SwipeDoor";
import SwipeEquipment from "@/pages/eCard/log/models/SwipeEquipment";

const NAMESPACE_SEPARATOR = '/';
const app: AppModels = {models: []};

app.models.push(globalModel)
app.models.push(admin)
app.models.push(ClassroomEdit)
app.models.push(administrator)
app.models.push(maintenance)
app.models.push(student)
app.models.push(teacher)
app.models.push(temporary)
app.models.push(SwipeEquipment)
app.models.push(SwipeDoor)


// @ts-ignore
//启用redux devtools，这个compose是外部插件加载进去
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

/**
 * 处理reducers和effects，仿造dva.js
 */
export function start() {
  let reducers: Reducers = {};
  for (let model of app.models) {
    reducers[model.namespace] = (state = model.state, action:AnyAction) => {
      let actionType:string = action.type;
      let values = actionType.split(NAMESPACE_SEPARATOR);
       let lastIndex=values.length-1;
      if (actionType.indexOf( model.namespace)===0) {
        if (model.reducers?.hasOwnProperty(values[lastIndex])) {
          return model.reducers[values[lastIndex]](state, action);
        }
      }
      return state;
    }
  }
  let reducer = combineReducers(reducers);
  let sagaMiddleware = createSagaMiddleware();

  function* rootSaga() {
    for (const model of app.models) {
      for (const key in model.effects) {
        yield effects.takeEvery<string,(...args: any[]) => any>(`${model.namespace}${NAMESPACE_SEPARATOR}${key}`, model.effects[key],effects);
      }
    }
  }
  let store = createStore(reducer,composeEnhancers(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(rootSaga);
  return store;

}