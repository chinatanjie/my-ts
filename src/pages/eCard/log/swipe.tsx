import React from "react";
import {ColumnsType} from "antd/es/table";
import {ClassroomInformation, ICInformation, LogClassroomSwipe,} from "@/pages/eCard/data";
import {ICCardStatusPredefine, ICCategoryPredefine,} from "@/pages/eCard/global";
import { Input, Select,  DatePicker} from "antd";

import ProFormSearch, {ProFormFields, ProFormSearchItemArrays} from "@/components/ProTable/proFormSearch";
import ProTable from "@/components/ProTable/proTable";


import {Dispatch} from "redux";

import {ProStateType} from "@/components/ProTable/data";
import {Moment} from "moment";
import {ICCardStatusPredefineType, ICCategoryPredefineType} from "../data";

const searchFormItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
}

export interface FormSearchSateType extends ProFormFields {
  name?: string;
  cardID?: string;
  department?: string;
  phone?: string;
  mail?: string;
  physicalID?: string;
  time?:Moment[];
  cardNO?:string;
  category?:string;
  status?:string;
  ack?:boolean;
  identificationCode?:string;
}

export interface StateType extends ProStateType<LogClassroomSwipe, FormSearchSateType> {

}

export interface SwipeProps extends StateType{

  dispatch: Dispatch;

  name:string;
}

class Swipe extends React.Component<SwipeProps, any> {

  constructor(props: SwipeProps, context: any) {
    super(props, context);
  }

  private columns: ColumnsType<LogClassroomSwipe> = [
    {
      key: 'classroomName',
      title: '教室名称',
      dataIndex: 'classroomInformation',
      align: 'center',
      ellipsis: true,
      width: 180,
      fixed: 'left',
      render: ((v: ClassroomInformation) => {
        return v?.campus&&((v?.campus as string) + v?.buildName + v?.floor + v?.name)
      }),
    },{
      key: 'physicalID',
      title: '物理卡号',
      dataIndex: 'physicalID',
      align: 'center',
      ellipsis: true,
      fixed: 'left',
      width: 160,
    }, {
      key: 'ack',
      title: '响应',
      dataIndex: 'ack',
      align: 'center',
      ellipsis: true,
      width: 65,
      render: (value => {
        return value!=undefined && (!!value ? '成功' : '失败')
      }),
    }, {
      key: 'comment',
      title: '回应消息',
      dataIndex: 'comment',
      align: 'center',
      ellipsis: true,
      width: 160,
    },{
      key: 'time',
      title: '刷卡时间',
      dataIndex: 'time',
      align: 'center',
      ellipsis: true,
      width: 160,
      render: (value) => {
        return value?.toLocaleString();
      }
    },  {
      key: 'classroomCategory',
      title: '教室类别',
      dataIndex: 'classroomInformation',
      align: 'center',
      ellipsis: true,
      width: 160,
      render: ((v: ClassroomInformation) => {
        return v?.category
      }),
    }, {
      key: 'cardNO',
      title: '卡面编号',
      dataIndex: 'icInformation',
      align: 'center',
      ellipsis: true,
      width: 120,
      render: (value: ICInformation) => {
        return value?.cardNO
      }
    }, {
      key: 'cardCategory',
      title: 'IC卡类别',
      dataIndex: 'icInformation',
      align: 'center',
      ellipsis: true,
      width: 120,
      render: (value: ICInformation) => {
        return value?.category&&ICCategoryPredefine[value?.category as ICCategoryPredefineType]
      }
    }, {
      key: 'cardStatus',
      title: '卡片状态',
      dataIndex: 'icInformation',
      align: 'center',
      ellipsis: true,
      width: 120,
      render: (value: ICInformation) => {
        return value?.status&&ICCardStatusPredefine[value?.status as ICCardStatusPredefineType]
      }
    }, {
      key: 'personName',
      title: '持卡人姓名',
      dataIndex: 'icInformation',
      align: 'center',
      ellipsis: true,
      width: 120,
      render: (value: ICInformation) => {
        return value?.personBaseInformation?.name
      }
    }, {
      key: 'personDepartment',
      title: '持卡人单位',
      dataIndex: 'icInformation',
      align: 'center',
      ellipsis: true,
      width: 160,
      render: (value: ICInformation) => {
        return value?.personBaseInformation?.department
      }
    }, {
      key: 'personIdentificationCode',
      title: '持卡人学工号',
      dataIndex: 'icInformation',
      align: 'center',
      ellipsis: true,
      width: 160,
      render: (value: ICInformation) => {
        return value?.personBaseInformation?.identificationCode
      }
    }, {
      key: 'personCardID',
      title: '持卡人身份证',
      dataIndex: 'icInformation',
      align: 'center',
      ellipsis: true,
      width: 160,
      render: (value: ICInformation) => {
        return value?.personBaseInformation?.cardID
      }
    }, {
      key: 'personPhone',
      title: '持卡人电话',
      dataIndex: 'icInformation',
      align: 'center',
      ellipsis: true,
      width: 140,
      render: (value: ICInformation) => {
        return value?.personBaseInformation?.phone
      }
    }, {
      key: 'departmentMail',
      title: '持卡人邮箱',
      dataIndex: 'icInformation',
      align: 'center',
      ellipsis: true,
      width: 240,
      render: (value: ICInformation) => {
        return value?.personBaseInformation?.mail
      }
    },
  ]

  render() {
    const {isHideForm, data, formSearch, pageSize} = this.props;
    const {dispatch, name} = this.props;
    const searchItem: ProFormSearchItemArrays = [
      {
        label: 'IC卡物理卡号',
        name: 'physicalID',
        children: <Input style={{width: '100%'}} placeholder={'请输入IC卡物理卡号'}/>, ...searchFormItemLayout
      }, {
        label: 'IC卡卡面编号',
        name: 'cardNO',
        children: <Input style={{width: '100%'}} placeholder={'请输入IC卡卡面编号'}/>, ...searchFormItemLayout
      }, {
        label: '持卡人姓名',
        name: 'name',
        children: <Input style={{width: '100%'}} placeholder={'请输入持卡人人员姓名'}/>, ...searchFormItemLayout
      }, {
        label: 'IC卡类别', name: 'category', children: <Select placeholder={'请选择IC卡类别'}
                                                            style={{width: '160px'}}
                                                            options={Object.keys(ICCategoryPredefine).map(value => {
                                                              return {
                                                                label: ICCategoryPredefine[value as ICCategoryPredefineType],
                                                                value: value,
                                                              }
                                                            })}/>, ...searchFormItemLayout
      }, {
        label: 'IC卡状态', name: 'status', children: <Select placeholder={'请选择IC卡状态'}
                                                            style={{width: '160px'}}
                                                            options={Object.keys(ICCardStatusPredefine).map(value => {
                                                              return {
                                                                label: ICCardStatusPredefine[value as ICCardStatusPredefineType],
                                                                value: value,
                                                              }
                                                            })}/>, ...searchFormItemLayout
      }, {
        label: '刷卡时间',
        name: 'time',
        children: <DatePicker.RangePicker
          showTime={{format: 'HH:mm'}}
          format="YYYY-MM-DD HH:mm:ss"
          onOk={(value) => {
            console.log(value)
          }}
        />, ...searchFormItemLayout
      }, {
        label: '响应',
        name: 'ack',
        children: <Select placeholder={'请选择响应'}
                          style={{width: '120px'}}
                          options={[{label: '成功', value: 'true'}, {
                            label: '失败',
                            value: 'false'
                          }]}/>, ...searchFormItemLayout
      }, {
        label: '持卡人工作单位', name: 'department', children: <Input placeholder={'请输入持卡人工作单位'}
                                                               style={{width: '100%'}}/>, ...searchFormItemLayout
      }, {
        label: '持卡人学工号', name: 'identificationCode', children: <Input style={{width: '100%'}}
                                                                      placeholder={'请输入持卡人学工号'}/>, ...searchFormItemLayout
      }, {
        label: '持卡人身份证', name: 'cardID', children: <Input style={{width: '100%'}}
                                                          placeholder={'请输入持卡人身份证'}/>, ...searchFormItemLayout
      }, {
        label: '持卡人电话', name: 'phone', children: <Input style={{width: '100%'}}
                                                        placeholder={'请输入持卡人电话'}/>, ...searchFormItemLayout
      }, {
        label: '持卡人邮箱', name: 'mail', children: <Input style={{width: '100%'}}
                                                       placeholder={'请输入持卡人邮箱'}/>, ...searchFormItemLayout
      },

    ];
    return (<div>
      <ProFormSearch initialValues={formSearch} childrenItem={searchItem} isHide={isHideForm}
                     namespace={name} dispatch={dispatch} pageSize={pageSize}/>
      <div className={'site-custom-background'} style={{marginTop: 8}}>
        <ProTable<LogClassroomSwipe> title={'刷卡记录'} namespace={name} data={data}
                                     columns={this.columns} dispatch={dispatch}
                                     pageSize={pageSize} formSearch={formSearch}
        />
      </div>
    </div>);
  }
}

export default Swipe;
