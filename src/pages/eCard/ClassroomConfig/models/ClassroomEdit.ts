import {Effect, Reducer} from '@/redux/data';
import {ClassroomCategoryInformation, ClassroomInformation} from "@/pages/eCard/data";
import {ProFormFields} from "@/components/ProTable/proFormSearch";
import {getClassroom,} from "@/pages/eCard/service";
import request, {Restful} from "@/utils/request";
import {setFormSearch, setSateProperty} from "@/components/ProTable/reducers";
import {ProStateType, ProTableModelType} from "@/components/ProTable/data";

export interface FormSearchSateType extends ProFormFields {
  name?: string;
  category?: string;
  floor?: number;
  build?: string;
  campus?: string;
}


export interface StateType extends ProStateType<ClassroomInformation, FormSearchSateType> {
  /**
   * category option value
   */
  categoryOptions: string[];
}

interface ExtendModel {
  effects: {
    queryCategoryOptions: Effect;
  }
}


const Model: ProTableModelType<ExtendModel, StateType> = {
  namespace: 'eCard/ClassroomConfig/ClassroomEdit',
  state: {
    data: {page: 0, pageSize: 10, totalRows: 0, totalPages: 0, data: []},
    pageSize: 10,
    isHideForm: true,
    formSearch: {fuzzy: false},
    categoryOptions: [],
  },

  effects: {
    * querySubmit({payload}, {call, put, select}) {
      const response = yield call(getClassroom, payload);
      // const state=yield select((e)=>{
      //   console.log(e)
      //   return e['classroomEdit']
      // })
      // console.log(state)
      yield put({type: 'setSateProperty', payload: {dataIndex: 'data', value: {}}})
      if (response && response.success && (response.resultBody != undefined)) {
        console.log(response)
        yield put({type: 'setSateProperty', payload: {dataIndex: 'data', value: response.resultBody}})
      }
    },
    * queryCategoryOptions({payload}, {call, put, select}) {
      const response = yield call(() => {
        return request.get<Restful<ClassroomCategoryInformation[]>>
        ('/api/information/classroom/config/category', {params: {noSubClassroom: true}});
      }, payload);
      if (response && response.success && (response.resultBody != undefined)) {
        console.log(response)
        yield put({
          type: 'setSateProperty', payload: {
            dataIndex: 'categoryOptions', value: response?.resultBody?.map((value: ClassroomCategoryInformation) => {
              return value.name;
            })
          }
        })
      }
    },
  },

  reducers: {
    setFormSearch,
    setSateProperty
  }
};

export default Model;
