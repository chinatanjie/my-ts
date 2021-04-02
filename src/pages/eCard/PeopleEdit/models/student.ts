
import { StudentInformationType} from "@/pages/eCard/data";
import {ProFormFields} from "@/components/ProTable/proFormSearch";
import {ProStateType, ProTableModelType} from "@/components/ProTable/data";
import { getStudent} from "@/pages/eCard/service";
import {Moment} from "moment";
import {DateFormatString} from "@/utils/time";
import {message} from "antd";
import {setFormSearch, setSateProperty} from "@/components/ProTable/reducers";

export interface FormSearchSateType extends ProFormFields {
  name?: string;
  studentID?: string;
  cardID?: string;
  departmentName?: string;
  sex?: string;
  isGraduate?: boolean | string;
  enrollment?: Moment[] | string[];
  className?: string;
  phone?: string;
  mail?: string;
  leader?: string;
  openClass?: Moment[] | string[];
}

export interface StateType extends ProStateType<StudentInformationType, FormSearchSateType> {

}

interface ExtendModel {

}

const Model: ProTableModelType<ExtendModel, StateType> = {
  namespace: 'eCard/PeopleEdit/student',
  state: {
    data: {page: 0, pageSize: 10, totalRows: 0, totalPages: 0, data: []},
    pageSize: 10,
    isHideForm: true,
    formSearch: {fuzzy: false, ASC: true}
  },

  effects: {
    * querySubmit({payload}, {call, put}) {
      const response = yield call(getStudent, {
        ...payload, enrollment: payload?.enrollment?.map((value: Moment) => {
          return value.format(DateFormatString)
        }), openClass: payload?.openClass?.map((value: Moment) => {
          return value.format(DateFormatString)
        })
      });
      yield put({type: 'setSateProperty', payload: {dataIndex: 'data', value: {data: []}}});
      if (response && response.success && response.resultBody) {
        yield put({
          type: 'setSateProperty', payload: {
            dataIndex: 'data', value: {
              ...response.resultBody, data: response.resultBody?.data?.map((value: StudentInformationType) => {
                return {...value, key: value.id};
              })
            }
          }
        })
      } else {
        message.error('查询学生信息失败:' + response.msg, 2)
      }
    },
  },

  reducers: {
    setFormSearch,
    setSateProperty,
  },
};

export default Model;
