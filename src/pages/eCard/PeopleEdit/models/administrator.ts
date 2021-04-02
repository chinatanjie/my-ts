
import {AdminInformationType,} from "@/pages/eCard/data";
import {ProFormFields} from "@/components/ProTable/proFormSearch";
import {Moment} from "moment";
import {getAdministrator} from "@/pages/eCard/service";
import {message} from "antd";
import {DateFormatString} from "@/utils/time";
import {setFormSearch, setSateProperty} from "@/components/ProTable/reducers";
import {ProStateType, ProTableModelType} from "@/components/ProTable/data";


export interface FormSearchSateType extends ProFormFields {
  name?: string;
  cardID?: string;
  employeeID?: string;
  departmentName?: string;
  sex?: string;
  grade?: number;
  hire?: Moment[];
  post?: string;
  phone?: string;
  mail?: string;
  status?: string;
}

export interface StateType extends ProStateType<AdminInformationType,FormSearchSateType>{

}
interface ExtendModel {

}


const Model: ProTableModelType<ExtendModel,StateType> = {
  namespace: 'eCard/PeopleEdit/administrator',
  state: {
    data: {page: 0, pageSize: 10, totalRows: 0, totalPages: 0, data: []},
    pageSize: 10,
    isHideForm: true,
    formSearch: {fuzzy: false, ASC: true}
  },

  effects: {
    * querySubmit({payload}, {call, put}) {
      const response = yield call(getAdministrator, {...payload,hire:payload?.hire?.map((value:Moment)=>{
        return value.format(DateFormatString)
        })});
      yield put({type:'setSateProperty',payload:{dataIndex: 'data',value: {data:[]}}});
      if (response && response.success && response.resultBody) {
        // console.log(response)
        yield put({
          type: 'setSateProperty', payload: {
            dataIndex: 'data', value: {
              ...response.resultBody, data: response.resultBody?.data?.map((value:AdminInformationType) => {
                return {...value, key: value.id};
              })
            }
          }
        })
      }else {
        message.error('查询管理员信息失败:' + response.msg, 2)
      }
    },

  },
  reducers: {
    setFormSearch,
    setSateProperty,
  },
};

export default Model;
