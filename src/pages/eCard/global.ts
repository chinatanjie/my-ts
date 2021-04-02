import {ColumnsType} from "antd/es/table";
import {ICInformation} from "@/pages/eCard/data";
import {ICCardStatusPredefineType} from "./data";


export const ICCardStatusPredefine={
  UNACTIVATED:'未激活',
  ACTIVATED: '已激活',
  LOSS:'挂失',
  INVALID:'无效卡',
  BLACKLIST:'黑名单',
  LOCK:'锁定',
  PAUSE:'暂停',
}



export const ICCategoryPredefine={
  ADMIN:'管理员卡',
  TEACHER: '教师卡',
  STUDENT:'学生卡',
  TEMP:'临时卡',
  MAINTENANCE:'维修人员卡',
}

export const SexualityPredefine={
  MALE:'男',
  FEMALE: '女',
}

export const icColumns: ColumnsType<ICInformation> = [{
  key: 'physicalID',
  title: '物理卡号',
  dataIndex: 'physicalID',
  align: 'center',
  ellipsis: true,
  width: 120,
}, {
  key: 'cardNO',
  title: '卡面编号',
  dataIndex: 'cardNO',
  align: 'center',
  ellipsis: true,
  width: 160,
}, {
  key: 'status',
  title: '状态',
  dataIndex: 'status',
  align: 'center',
  ellipsis: true,
  width: 100,
  render: (text:ICCardStatusPredefineType) => {
    return ICCardStatusPredefine[text]
  }
}, {
  key: 'remarks',
  title: '备注',
  dataIndex: 'remarks',
  align: 'center',
  ellipsis: true,
  width: 240,
},];

Object.seal(ICCardStatusPredefine);
Object.freeze(ICCardStatusPredefine);

Object.seal(ICCategoryPredefine);
Object.freeze(ICCategoryPredefine);

Object.seal(SexualityPredefine);
Object.freeze(SexualityPredefine);

Object.seal(icColumns);
Object.freeze(icColumns);
