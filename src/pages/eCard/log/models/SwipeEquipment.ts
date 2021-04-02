import {ProTableModelType} from "@/components/ProTable/data";
import {LogClassroomSwipe,} from "@/pages/eCard/data";
import {getSwipe,} from "@/pages/eCard/service";
import {message} from "antd";
import {setFormSearch, setSateProperty} from "@/components/ProTable/reducers";
import {StateType} from "@/pages/eCard/log/swipe";
import {Moment} from "moment";
import {DateTimeFormatString} from "@/utils/time";


interface ExtendModel {

}

const Model: ProTableModelType<ExtendModel, StateType> = {
  namespace: 'eCard/log/SwipeEquipment',
  state: {
    data: {page: 0, pageSize: 10, totalRows: 0, totalPages: 0, data: []},
    pageSize: 10,
    isHideForm: true,
    formSearch: {fuzzy: false, ASC: true}
  },

  effects: {
    * querySubmit({payload}, {call, put}) {
      const response = yield call(getSwipe, {
        ...payload, time: payload?.time?.map((value: Moment) => {
          return value.format(DateTimeFormatString)
        })
      }, 'equipment');
      yield put({type: 'setSateProperty', payload: {dataIndex: 'data', value: {data: []}}});
      if (response && response.success && (response.resultBody != undefined)) {
        yield put({
          type: 'setSateProperty', payload: {
            dataIndex: 'data', value: {
              ...response.resultBody, data: response.resultBody?.data?.map((value: LogClassroomSwipe) => {
                return {...value, key: value.id};
              })
            }
          }
        })
      } else {
        message.error('查询设备刷卡信息失败:' + response.msg, 2)
      }
    },
  },

  reducers: {
    setFormSearch,
    setSateProperty,
  },
};

export default Model;
