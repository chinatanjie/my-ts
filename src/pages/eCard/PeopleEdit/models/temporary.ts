import { TemporaryInformationType,} from "@/pages/eCard/data";
import {ProFormFields} from "@/components/ProTable/proFormSearch";
import {ProStateType, ProTableModelType} from "@/components/ProTable/data";
import {getTemporary} from "@/pages/eCard/service";
import {message} from "antd";
import {setFormSearch, setSateProperty} from "@/components/ProTable/reducers";

export interface FormSearchSateType extends ProFormFields {
  name?: string;
  cardID?: string;
  departmentName?: string;
  sex?: string;
  phone?: string;
  mail?: string;
}

export interface StateType extends ProStateType<TemporaryInformationType, FormSearchSateType> {

}

interface ExtendModel {

}

const Model: ProTableModelType<ExtendModel, StateType> = {
  namespace: 'eCard/PeopleEdit/temporary',
  state: {
    data: {page: 0, pageSize: 10, totalRows: 0, totalPages: 0, data: []},
    pageSize: 10,
    isHideForm: true,
    formSearch: {fuzzy: false, ASC: true}
  },

  effects: {
    * querySubmit({payload}, {call, put}) {
      const response = yield call(getTemporary, {
        ...payload
      });
      yield put({type: 'setSateProperty', payload: {dataIndex: 'data', value: {data: []}}});
      if (response && response.success && response.resultBody ) {
        yield put({
          type: 'setSateProperty', payload: {
            dataIndex: 'data', value: {
              ...response.resultBody, data: response.resultBody?.data?.map((value: TemporaryInformationType) => {
                return {...value, key: value.id};
              })
            }
          }
        })
      } else {
        message.error('查询临时人员信息失败:' + response.msg, 2)
      }
    },
  },

  reducers: {
    setFormSearch,
    setSateProperty,
  },
};

export default Model;
