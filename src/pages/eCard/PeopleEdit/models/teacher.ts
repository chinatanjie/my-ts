import { TeacherInformationType} from "@/pages/eCard/data";
import {ProFormFields} from "@/components/ProTable/proFormSearch";
import {ProStateType, ProTableModelType} from "@/components/ProTable/data";
import {getTeacher} from "@/pages/eCard/service";
import {Moment} from "moment";
import {DateFormatString} from "@/utils/time";
import {message} from "antd";
import {setFormSearch, setSateProperty} from "@/components/ProTable/reducers";

export interface FormSearchSateType extends ProFormFields {
  name?: string;
  cardID?: string;
  employeeID?: string;
  departmentName?: string;
  sex?: string;
  hire?: Moment[];
  phone?: string;
  mail?: string;
  status?: string;
}

export interface StateType extends ProStateType<TeacherInformationType, FormSearchSateType> {

}

interface ExtendModel {

}

const Model: ProTableModelType<ExtendModel, StateType> = {
  namespace: 'eCard/PeopleEdit/teacher',
  state: {
    data: {page: 0, pageSize: 10, totalRows: 0, totalPages: 0, data: []},
    pageSize: 10,
    isHideForm: true,
    formSearch: {fuzzy: false, ASC: true}
  },

  effects: {
    * querySubmit({payload}, {call, put}) {
      const response = yield call(getTeacher, {
        ...payload, hire: payload?.hire?.map((value: Moment) => {
          return value.format(DateFormatString)
        })
      });
      yield put({type: 'setSateProperty', payload: {dataIndex: 'data', value: {data: []}}});
      if (response && response.success && response.resultBody) {
        yield put({
          type: 'setSateProperty', payload: {
            dataIndex: 'data', value: {
              ...response.resultBody, data: response.resultBody?.data?.map((value: TeacherInformationType) => {
                return {...value, key: value.id};
              })
            }
          }
        })
      } else {
        message.error('查询教师信息失败:' + response.msg, 2)
      }
    },
  },

  reducers: {
    setFormSearch,
    setSateProperty,
  },
};

export default Model;
