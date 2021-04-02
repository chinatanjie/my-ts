import React from "react";
import {ColumnsType} from "antd/es/table";
import {ICInformation, PersonBaseInformation,} from "@/pages/eCard/data";
import {ICCardStatusPredefine, ICCategoryPredefine,} from "@/pages/eCard/global";
import {ICCardStatusPredefineType,ICCategoryPredefineType} from "../data"
import {Button, Input, Popconfirm, Select, Space,} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons/lib";
import ProFormSearch, {ProFormSearchItemArrays} from "@/components/ProTable/proFormSearch";
import ProTable from "@/components/ProTable/proTable";
import model from "./models/admin"
import {StateType} from "@/pages/eCard/ICCard/models/admin";
import {connect} from "react-redux";
import {Dispatch} from "redux"

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

const namespace=model.namespace;

interface AdminProps extends StateType{
  dispatch: Dispatch;
}

const title: string = 'IC卡信息管理';
const subTitle: string = 'IC卡信息查询、编辑、创建、删除等操作，同时可以查询到IC卡持卡人信息，还可以给IC卡分配人员';

class Admin extends React.Component<AdminProps, any> {


  /**
   * 表格定义
   */
  private columns: ColumnsType<ICInformation> = [
    {
      key: 'physicalID',
      title: '物理卡号',
      dataIndex: 'physicalID',
      align: 'center',
      ellipsis: true,
      fixed: 'left',
      width: 160,
    }, {
      key: 'cardNO',
      title: '卡面编号',
      dataIndex: 'cardNo',
      align: 'center',
      ellipsis: true,
      width: 120,
    }, {
      key: 'cardCategory',
      title: 'IC卡类别',
      dataIndex: 'category',
      align: 'center',
      ellipsis: true,
      width: 120,
      render: (value: string) => {
        return ICCategoryPredefine[value as ICCategoryPredefineType]
      }
    }, {
      key: 'cardStatus',
      title: '卡片状态',
      dataIndex: 'status',
      align: 'center',
      ellipsis: true,
      width: 120,
      render: (value ) => {
        return ICCardStatusPredefine[value as ICCardStatusPredefineType]
      }
    }, {
      key: 'personName',
      title: '姓名',
      dataIndex: 'personBaseInformation',
      align: 'center',
      ellipsis: true,
      width: 120,
      render: (value: PersonBaseInformation) => {
        return value?.name
      }
    }, {
      key: 'personDepartment',
      title: '工作单位',
      dataIndex: 'personBaseInformation',
      align: 'center',
      ellipsis: true,
      width: 160,
      render: (value: PersonBaseInformation) => {
        return value?.department
      }
    }, {
      key: 'personIdentificationCode',
      title: '工号',
      dataIndex: 'personBaseInformation',
      align: 'center',
      ellipsis: true,
      width: 160,
      render: (value: PersonBaseInformation) => {
        return value?.identificationCode
      }
    }, {
      key: 'personCardID',
      title: '身份证',
      dataIndex: 'personBaseInformation',
      align: 'center',
      ellipsis: true,
      width: 160,
      render: (value: PersonBaseInformation) => {
        return value?.cardID
      }
    }, {
      key: 'personPhone',
      title: '电话',
      dataIndex: 'personBaseInformation',
      align: 'center',
      ellipsis: true,
      width: 140,
      render: (value: PersonBaseInformation) => {
        return value?.phone
      }
    }, {
      key: 'departmentMail',
      title: '邮箱',
      dataIndex: 'personBaseInformation',
      align: 'center',
      ellipsis: true,
      width: 240,
      render: (value: PersonBaseInformation) => {
        return value?.mail
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
              <Popconfirm title="是否要删除此临时人员？" onConfirm={() => {
              }}>
                <Button type={'primary'} danger icon={<DeleteOutlined/>}>删除</Button>
              </Popconfirm>
            </Space>
        )
      }
    },
  ]


  render() {
    const {isHideForm, formSearch, pageSize,data} = this.props;
    const {dispatch,} = this.props;

    /**
     * 搜索字段定义
     */
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
        label: '姓名',
        name: 'name',
        children: <Input style={{width: '100%'}} placeholder={'请输入持卡人人员姓名'}/>, ...searchFormItemLayout
      }, {
        label: 'IC卡类别', name: 'category', children: <Select placeholder={'请选择IC卡类别'}
                                                            style={{width: '160px'}}
                                                            options={Object.keys(ICCategoryPredefine).map(value=> {
                                                              return {
                                                                label: ICCategoryPredefine[value as ICCategoryPredefineType],
                                                                value: value,
                                                              }
                                                            })}/>, ...searchFormItemLayout
      }, {
        label: 'IC卡状态', name: 'status', children: <Select placeholder={'请选择IC卡状态'}
                                                          style={{width: '160px'}}
                                                          options={Object.keys(ICCardStatusPredefine).map((value) => {
                                                            return {
                                                              label: ICCardStatusPredefine[value as ICCardStatusPredefineType],
                                                              value: value,
                                                            }
                                                          })}/>, ...searchFormItemLayout
      }, {
        label: '工作单位', name: 'department', children: <Input placeholder={'请输入持卡人工作单位'}
                                                               style={{width: '100%'}}/>, ...searchFormItemLayout
      }, {
        label: '工号', name: 'identificationCode', children: <Input style={{width: '100%'}}
                                                                      placeholder={'请输入持卡人学工号'}/>, ...searchFormItemLayout
      }, {
        label: '身份证', name: 'cardID', children: <Input style={{width: '100%'}}
                                                          placeholder={'请输入持卡人身份证'}/>, ...searchFormItemLayout
      }, {
        label: '电话', name: 'phone', children: <Input style={{width: '100%'}}
                                                        placeholder={'请输入持卡人电话'}/>, ...searchFormItemLayout
      }, {
        label: '邮箱', name: 'mail', children: <Input style={{width: '100%'}}
                                                       placeholder={'请输入持卡人邮箱'}/>, ...searchFormItemLayout
      },

    ];
    return (
        <div><ProFormSearch initialValues={formSearch} childrenItem={searchItem} isHide={isHideForm}
                            namespace={namespace} dispatch={dispatch} pageSize={pageSize}/>
          <div style={{textAlign: 'right', padding: '8px 16px 0 16px'}}>
            <Space><Button type={'primary'}>新建IC卡</Button><Button type={'primary'}>批量导入</Button></Space></div>
          <div className={'site-custom-background'} style={{marginTop: 8}}>
            <ProTable<ICInformation> title={'IC卡'} namespace={namespace} data={data}
                                     columns={this.columns} dispatch={dispatch}
                                     pageSize={pageSize} formSearch={formSearch}
                                     tableProps={{size: 'middle'}}
            />

          </div>
        </div>

    );
  }
}

export default connect(
    (
        state:any) => {
      return {
          ...state[namespace],

      }
    })(Admin);
