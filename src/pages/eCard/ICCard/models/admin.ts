import {ProFormFields} from "@/components/ProTable/proFormSearch";
import {ProStateType, ProTableModelType} from "@/components/ProTable/data";
import {ICInformation, AdminInformationType} from "@/pages/eCard/data";
import {getICCard, } from "@/pages/eCard/service";
import {message} from "antd";
import {setFormSearch, setSateProperty} from "@/components/ProTable/reducers";


export interface FormSearchSateType extends ProFormFields {
  name?: string;
  cardID?: string;
  department?: string;
  phone?: string;
  mail?: string;
  physicalID?: string;
  cardNO?:string;
  category?:string;
  status?:string;
  identificationCode?:string;
}

export interface StateType extends ProStateType<AdminInformationType, FormSearchSateType> {

}

interface ExtendModel {

}

const Model: ProTableModelType<ExtendModel, StateType> = {
  namespace: 'eCard/ICCard/admin',
  state: {
    data: {page: 0, pageSize: 10, totalRows: 0, totalPages: 0, data: []},
    pageSize: 10,
    isHideForm: true,
    formSearch: {fuzzy: false, ASC: true}
  },

  effects: {
    * querySubmit({payload},{call,put}) {
      const response = yield call(getICCard, {
        ...payload
      });
      yield put({type: 'setSateProperty', payload: {dataIndex: 'data', value: {data: []}}});
      if (response && response.success && (response.resultBody != undefined)) {
        yield put({
          type: 'setSateProperty', payload: {
            dataIndex: 'data', value: {
              ...response.resultBody, data: response.resultBody?.data?.map((value: ICInformation) => {
                return {...value, key: value.id};
              })
            }
          }
        })
      } else {
        message.error('查询临时人员信息失败:' + response.msg, 2).then(r =>{} )
      }
    },
  },

  reducers: {
    setFormSearch,
    setSateProperty,
  },
};

export default Model;
