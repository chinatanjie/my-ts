import React from "react";

import {connect} from "react-redux";
import Model ,{StateType} from "./models/student";

import ProFormSearch, {ProFormSearchItemArrays} from "@/components/ProTable/proFormSearch";
import {Button, DatePicker, Input, Popconfirm, Select, Space, Table} from "antd";
import {Dispatch, } from "redux";
import {ColumnsType} from "antd/es/table";
import {
  ICInformation,
  StudentInformationType
} from "@/pages/eCard/data";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons/lib";
import {icColumns, SexualityPredefine} from "@/pages/eCard/global";
import ProTable from "@/components/ProTable/proTable";
import {SexualityPredefineType} from "../data";

const namespace=Model.namespace;


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


interface StudentProps extends StateType{
  dispatch: Dispatch;

}

const title: string = '学生信息管理';
const subTitle: string = '学生基础信息查询、编辑、创建、删除等操作，同时可以查询到每个学生名下所有IC卡的持卡信息';

class Student extends React.Component<StudentProps, any> {

  constructor(props: StudentProps, context: any) {
    super(props, context);
  }

  private columns: ColumnsType<StudentInformationType> = [
    {
      key: 'name',
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      ellipsis: true,
      fixed: 'left',
      width: 120,
    }, {
      key: 'sex',
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      ellipsis: true,
      width: 65,
      render: (value => {
        return SexualityPredefine[value as SexualityPredefineType]
      })
    }, {
      key: 'studentID',
      title: '学籍编号',
      dataIndex: 'employeeID',
      align: 'center',
      ellipsis: true,
      width: 150,
    }, {
      key: 'cardID',
      title: '身份证',
      dataIndex: 'cardID',
      align: 'center',
      ellipsis: true,
      width: 180,
    }, {
      key: 'departmentName',
      title: '院系',
      dataIndex: 'classBaseInformation',
      align: 'center',
      ellipsis: true,
      width: 160,
      render: (text) => {
        return text?.classBaseInformation?.departmentName
      }
    }, {
      key: 'isGraduate',
      title: '是否毕业',
      dataIndex: 'isGraduate',
      align: 'center',
      ellipsis: true,
      width: 90,
      render: (text) => {
        return text && (text?'毕业':'在校')
      }
    }, {
      key: 'className',
      title: '班级',
      dataIndex: 'className',
      align: 'center',
      ellipsis: true,
      width: 150,
    }, {
      key: 'leader',
      title: '班主任',
      dataIndex: 'classBaseInformation',
      align: 'center',
      ellipsis: true,
      width: 120,
      render: (text) => {
        return text?.classBaseInformation?.leaderName
      }
    },{
      key: 'ics',
      title: '持卡数量',
      dataIndex: 'ics',
      align: 'center',
      ellipsis: true,
      width: 90,
      render: (value, record) => {
        return (
          !!value ? value.length : 0
        )
      }
    }, {
      key: 'phone',
      title: '电话',
      dataIndex: 'phone',
      align: 'center',
      ellipsis: true,
      width: 120,
    }, {
      key: 'mail',
      title: '邮箱',
      dataIndex: 'mail',
      align: 'center',
      ellipsis: true,
      width: 240,
    }, {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      ellipsis: true,
      width: 120,
    }, {
      key: 'enrollment',
      title: '入学日期',
      dataIndex: 'enrollment',
      align: 'center',
      ellipsis: true,
      width: 120,
      render: (value: Date, record) => {
        return value?.toLocaleString();
      }
    }, {
      key: 'openClass',
      title: '开班日期',
      dataIndex: 'classBaseInformation',
      align: 'center',
      ellipsis: true,
      width: 120,
      render: (text) => {
        return text?.classBaseInformation?.openClass?.toLocaleString()
      }
    },{
      key: 'birth',
      title: '出生日期',
      dataIndex: 'birth',
      align: 'center',
      ellipsis: true,
      width: 120,
      render: (value: Date, record) => {
        return value?.toLocaleString();
      }
    }, {
      key: 'remarks',
      title: '备注',
      dataIndex: 'remarks',
      align: 'center',
      ellipsis: true,
      width: 240,
    }, {
      key: 'createTime',
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      ellipsis: true,
      width: 160,
      render: (value, record) => {
        return value?.toLocaleString();
      }
    }, {
      key: 'lastTime',
      title: '修改时间',
      dataIndex: 'lastTime',
      align: 'center',
      ellipsis: true,
      width: 160,
      render: (value, record) => {
        return value?.toLocaleString();
      }
    }, {
      key: 'action',
      title: '操作',
      align: 'center',
      ellipsis: true,
      width: 220,
      render: (value, record) => {
        return (
          <Space>
            <Button type={'primary'} icon={<EditOutlined/>} onClick={(e) => {

            }}>编辑</Button>
            <Popconfirm title="是否要删除此学生？" onConfirm={() => {
            }}>
              <Button type={'primary'} danger icon={<DeleteOutlined/>}>删除</Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ]


  render() {
    const {isHideForm, data, formSearch,pageSize} = this.props;
    const {dispatch, } = this.props;
    const searchItem: ProFormSearchItemArrays = [
      {
        label: '姓名',
        name: 'classroomName',
        children: <Input style={{width: '100%'}} placeholder={'请输入学生姓名'}/>, ...searchFormItemLayout
      }, {
        label: '班级', name: 'className', children: <Input placeholder={'请输入所在班级'}
                                                         style={{width: '100%'}}/>, ...searchFormItemLayout
      }, {
        label: '学号', name: 'studentID', children: <Input style={{width: '100%'}}
                                                     placeholder={'请输入学籍编号'}/>, ...searchFormItemLayout,
      }, {
        label: '性别', name: 'sex', children: <Select placeholder={'请选择性别'}
                                                             style={{width: '160px'}}
                                                             options={[{label: '男', value: 'male'}, {
                                                               label: '女',
                                                               value: 'female'
                                                             }]}/>, ...searchFormItemLayout
      },{
        label: '是否毕业', name: 'isGraduate', children: <Select placeholder={'请选择是否毕业'}
                                                    style={{width: '160px'}}
                                                    options={[{label: '毕业', value: 'true'}, {
                                                      label: '在校',
                                                      value: 'false'
                                                    }]}/>, ...searchFormItemLayout
      },{
        label: '入学日期',
        name: 'enrollment',
        children: <DatePicker.RangePicker style={{width: '100%'}}/>, ...searchFormItemLayout
      },{
        label: '开班日期',
        name: 'openClass',
        children: <DatePicker.RangePicker style={{width: '100%'}}/>, ...searchFormItemLayout
      }, {
        label: '身份证', name: 'cardID', children: <Input style={{width: '100%'}}
                                                       placeholder={'请输入身份证'}/>, ...searchFormItemLayout
      }, {
        label: '班主任', name: 'leader', children: <Input style={{width: '100%'}}
                                                    placeholder={'请输入班主任姓名'}/>, ...searchFormItemLayout
      }, {
        label: '电话', name: 'phone', children: <Input style={{width: '100%'}}
                                                     placeholder={'请输入电话'}/>, ...searchFormItemLayout
      }, {
        label: '邮箱', name: 'mail', children: <Input style={{width: '100%'}}
                                                    placeholder={'请输入邮箱'}/>, ...searchFormItemLayout
      },

    ];
    return (<div>
        <ProFormSearch initialValues={formSearch} childrenItem={searchItem} isHide={isHideForm} dispatch={dispatch}
                       namespace={namespace} pageSize={pageSize}
        />
        <div style={{textAlign: 'right', padding: '8px 16px 0 16px'}}>
          <Space><Button type={'primary'}>新建学生</Button><Button type={'primary'}>批量导入</Button></Space></div>
        <div className={'site-custom-background'} style={{marginTop: 8}}>

          <ProTable<StudentInformationType> title={'学生'} namespace={'PeopleEditStudent'} data={data}
                                            columns={this.columns}  dispatch={dispatch}
                                            pageSize={pageSize} formSearch={formSearch}
                                            tableProps={{
                                              expandable: {
                                                rowExpandable: (record) => (!!record?.ics?.length && record?.ics?.length > 0),
                                                expandedRowRender: (record, index) => {
                                                  return <Table<ICInformation> bordered pagination={false}
                                                                               columns={icColumns}
                                                                               dataSource={record?.ics?.map(value => {
                                                                                         return {
                                                                                           ...value,
                                                                                           key: value.id
                                                                                         }
                                                                                       })} style={{marginTop: 32,marginBottom: 32}}/>
                                                }
                                              },

                                            }}/>
        </div>

      </div>
    );
  }
}

export default connect(
    (
        state: any) => {
      return {
        ...state[namespace],

      }
    })(Student);
