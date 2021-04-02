import React from "react";

import {connect} from "react-redux";

import ProFormSearch, {ProFormSearchItemArrays} from "@/components/ProTable/proFormSearch";
import {Button, Input, Popconfirm, Select, Space, Table} from "antd";
import {Dispatch} from "redux";
import {ColumnsType} from "antd/es/table";
import {ICInformation, MaintenanceInformationType,} from "@/pages/eCard/data";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons/lib";
import {StateType} from "./models/maintenance"
import {icColumns, SexualityPredefine} from "@/pages/eCard/global";
import ProTable from "@/components/ProTable/proTable";
import model from "./models/maintenance"
import {SexualityPredefineType} from "../data";

const namespace = model.namespace;
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


interface MaintenanceProps extends StateType {

  dispatch: Dispatch;

}

const title: string = '维护人员信息配置';
const subTitle: string = '维护人员基础信息查询、编辑、创建、删除等操作，同时可以查询到人员名下所有IC卡的持卡信息';

class Maintenance extends React.Component<MaintenanceProps, any> {

  constructor(props: MaintenanceProps, context: any) {
    super(props, context);
    console.log(props)
  }

  private columns: ColumnsType<MaintenanceInformationType> = [
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
      key: 'cardID',
      title: '身份证',
      dataIndex: 'cardID',
      align: 'center',
      ellipsis: true,
      width: 180,
    }, {
      key: 'department',
      title: '工作单位',
      dataIndex: 'department',
      align: 'center',
      ellipsis: true,
      width: 240,
    }, {
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
              <Popconfirm title="是否要删除此维护？" onConfirm={() => {
              }}>
                <Button type={'primary'} danger icon={<DeleteOutlined/>}>删除</Button>
              </Popconfirm>
            </Space>
        )
      }
    },
  ]


  render() {
    const {isHideForm, data, formSearch, pageSize} = this.props;
    const {dispatch,} = this.props;
    const searchItem: ProFormSearchItemArrays = [
      {
        label: '姓名',
        name: 'name',
        children: <Input style={{width: '100%'}} placeholder={'请输入维护人员姓名'}/>, ...searchFormItemLayout
      }, {
        label: '工作单位', name: 'departmentName', children: <Input placeholder={'请输入工作单位'}
                                                                style={{width: '100%'}}/>, ...searchFormItemLayout
      }, {
        label: '身份证', name: 'cardID', children: <Input style={{width: '100%'}}
                                                       placeholder={'请输入身份证'}/>, ...searchFormItemLayout
      }, {
        label: '性别', name: 'sex', children: <Select placeholder={'请选择性别'}
                                                    style={{width: '120px'}}
                                                    options={[{label: '男', value: 'male'}, {
                                                      label: '女',
                                                      value: 'female'
                                                    }]}/>, ...searchFormItemLayout
      }, {
        label: '电话', name: 'phone', children: <Input style={{width: '100%'}}
                                                     placeholder={'请输入电话'}/>, ...searchFormItemLayout
      }, {
        label: '邮箱', name: 'mail', children: <Input style={{width: '100%'}}
                                                    placeholder={'请输入邮箱'}/>, ...searchFormItemLayout
      },

    ];
    return (
        <div><ProFormSearch initialValues={formSearch} childrenItem={searchItem} isHide={isHideForm}
                            namespace={namespace} dispatch={dispatch} pageSize={pageSize}/>
          <div style={{textAlign: 'right', padding: '8px 16px 0 16px'}}>
            <Space><Button type={'primary'}>新建维护人员</Button><Button type={'primary'}>批量导入</Button></Space></div>
          <div className={'site-custom-background'} style={{marginTop: 8}}>
            <ProTable<MaintenanceInformationType> title={'维护人员'} namespace={'PeopleEditMaintenance'} data={data}
                                                  columns={this.columns} dispatch={dispatch}
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
                                                                                     })} style={{
                                                          marginTop: 32,
                                                          marginBottom: 32
                                                        }}/>
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
    })(Maintenance);



