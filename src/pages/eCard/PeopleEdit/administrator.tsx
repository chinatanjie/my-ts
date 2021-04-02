import React from "react";
import {connect} from "react-redux";
import ProFormSearch, {ProFormSearchItemArrays} from "@/components/ProTable/proFormSearch";
import {Button, DatePicker, Input, Popconfirm, Select, Space, Table} from "antd";
import {Dispatch} from "redux";
import {ColumnsType} from "antd/es/table";
import {AdminInformationType, ICInformation,} from "@/pages/eCard/data";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons/lib";
import {StateType} from "./models/administrator"
import {icColumns, SexualityPredefine} from "@/pages/eCard/global";
import ProTable from "@/components/ProTable/proTable";
import model from "./models/administrator"
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


interface AdministratorProps extends StateType {
  dispatch: Dispatch;


}

const title: string = '管理员信息配置';
const subTitle: string = '管理员基础信息查询、编辑、创建、删除等操作，同时可以查询到人员名下所有IC卡的持卡信息';

class Administrator extends React.Component<AdministratorProps, any> {

  constructor(props: AdministratorProps, context: any) {
    super(props, context);
    // console.log(props.match)
    // let {id}=useParams();
    // console.log(id)
  }

  private columns: ColumnsType<AdminInformationType> = [
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
      key: 'employeeID',
      title: '工号',
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
      title: '部门',
      dataIndex: 'departmentName',
      align: 'center',
      ellipsis: true,
      width: 160,
    }, {
      key: 'grade',
      title: '权限级别',
      dataIndex: 'grade',
      align: 'center',
      ellipsis: true,
      width: 90,
      render: (text) => {
        return text && (text + '级')
      }
    }, {
      key: 'post',
      title: '职位',
      dataIndex: 'post',
      align: 'center',
      ellipsis: true,
      width: 90,
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
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      ellipsis: true,
      width: 120,
    }, {
      key: 'hire',
      title: '入职日期',
      dataIndex: 'hire',
      align: 'center',
      ellipsis: true,
      width: 120,
      render: (value: Date, record) => {
        return value?.toLocaleString();
      }
    }, {
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
              <Popconfirm title="是否要删除此管理员？" onConfirm={() => {
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
        children: <Input style={{width: '100%'}} placeholder={'请输入管理员姓名'}/>, ...searchFormItemLayout
      }, {
        label: '部门', name: 'departmentName', children: <Select placeholder={'请选择所属部门'}
                                                               style={{width: '100%'}}/>, ...searchFormItemLayout
      }, {
        label: '工号', name: 'employeeID', children: <Input style={{width: '100%'}}
                                                          placeholder={'请输入管理员工号'}/>, ...searchFormItemLayout,
      }, {
        label: '性别', name: 'sex', children: <Select placeholder={'请选择性别'}
                                                    style={{width: '30%'}}
                                                    options={[{label: '男', value: 'male'}, {
                                                      label: '女',
                                                      value: 'female'
                                                    }]}/>, ...searchFormItemLayout
      }, {
        label: '权限级别', name: 'grade', children: <Input style={{width: '100%'}}
                                                       placeholder={'请输入权限级别'}/>, ...searchFormItemLayout,
        rules: [{required: false, message: '请输入非0正整数', pattern: /^[1-9][0-9]*$/}],
      }, {
        label: '入职日期',
        name: 'hire',
        children: <DatePicker.RangePicker style={{width: '100%'}}/>, ...searchFormItemLayout
      }, {
        label: '身份证', name: 'cardID', children: <Input style={{width: '100%'}}
                                                       placeholder={'请输入身份证'}/>, ...searchFormItemLayout
      }, {
        label: '职位', name: 'post', children: <Input style={{width: '100%'}}
                                                    placeholder={'请输入职位'}/>, ...searchFormItemLayout
      }, {
        label: '电话', name: 'phone', children: <Input style={{width: '100%'}}
                                                     placeholder={'请输入电话'}/>, ...searchFormItemLayout
      }, {
        label: '邮箱', name: 'mail', children: <Input style={{width: '100%'}}
                                                    placeholder={'请输入邮箱'}/>, ...searchFormItemLayout
      }, {
        label: '状态', name: 'status', children: <Input style={{width: '100%'}}
                                                      placeholder={'请输入状态'}/>, ...searchFormItemLayout
      },

    ];
    return (
        <div>
          <ProFormSearch initialValues={formSearch} childrenItem={searchItem} isHide={isHideForm}
                         namespace={namespace} dispatch={dispatch} pageSize={pageSize}/>
          <div style={{textAlign: 'right', padding: '8px 16px 0 16px'}}>
            <Space><Button type={'primary'}>新建管理员</Button><Button type={'primary'}>批量导入</Button></Space></div>
          <div className={'site-custom-background'} style={{marginTop: 8}}>
            <ProTable<AdminInformationType> title={'管理员'} namespace={'peopleEditAdministrator'} data={data}
                                            columns={this.columns} dispatch={dispatch}
                                            pageSize={pageSize} formSearch={formSearch}
                                            tableProps={{
                                              expandable: {
                                                rowExpandable: (record) => (!!record?.ics?.length && record?.ics?.length > 0),
                                                expandedRowRender: (record, index) => {
                                                  return <Table<ICInformation> bordered pagination={false}
                                                                               columns={icColumns}
                                                                               dataSource={record?.ics?.map(value => {
                                                                                 return {...value, key: value.id}
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
    })(Administrator);



