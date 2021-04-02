import React from "react";

import {connect} from "react-redux";
import {StateType} from "@/pages/eCard/ClassroomConfig/models/ClassroomEdit";

import ProFormSearch, {ProFormSearchItemArrays} from "@/components/ProTable/proFormSearch";
import {Button, Input, Modal, Popconfirm, Select, Space, Table} from "antd";
import {Dispatch} from "redux"
import {ColumnsType} from "antd/es/table";
import {ClassroomInformation} from "@/pages/eCard/data";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons/lib";
import ClassroomForm from "@/pages/eCard/components/ClassroomForm";
import model from './models/ClassroomEdit'

const namespace=model.namespace;

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


interface ClassroomEditProps extends StateType{
  dispatch: Dispatch;

}

interface ClassroomEditState {
  /**
   * 控制新建对话框显示
   */
  classroomModalVisible: boolean;
}

const title: string = '教室信息管理';
const subTitle: string = '教室基础信息、视频地址、设备配置编辑和查询，为了支持小型低功耗不能识别UTF-8中文编码设备，请设置英文字段别名';

class ClassroomEdit extends React.Component<ClassroomEditProps, ClassroomEditState> {

  constructor(props: ClassroomEditProps, context: any) {
    super(props, context);
    this.state = {classroomModalVisible: false}
  }

  private columns: ColumnsType<ClassroomInformation> = [
    {
      key: 'name',
      title: '教室完整名称',
      dataIndex: 'name',
      align: 'center',
      ellipsis: true,
      fixed: 'left',
      width: 240,
      render: (value, record) => {
        return (record?.campus || '') + (record?.buildName || '') + record.floor + 'F' + value;
      }
    }, {
      key: 'nameAlias',
      title: '字段别名',
      dataIndex: 'nameAlias',
      align: 'center',
      ellipsis: true,
      width: 120,
    }, {
      key: 'terminalIP',
      title: '终端IP',
      dataIndex: 'terminalIP',
      align: 'center',
      ellipsis: true,
      width: 160,
    }, {
      key: 'terminalID',
      title: '终端序列号',
      dataIndex: 'terminalID',
      align: 'center',
      ellipsis: true,
      width: 120,
    }, {
      key: 'rtsp',
      title: '视频源',
      dataIndex: 'rtsp',
      align: 'center',
      ellipsis: true,
      width: 90,
      render: (value, record) => {
        return (
            !!value ? <Button size={'small'}>查看</Button> : '-'
        )
      }
    }, {
      key: 'equipmentList',
      title: '设备列表',
      dataIndex: 'equipmentList',
      align: 'center',
      ellipsis: true,
      width: 90,
      render: (value, record) => {
        return (
            !!value ? <Button size={'small'}>查看</Button> : '-'
        )
      }
    }, {
      key: 'category',
      title: '类别',
      dataIndex: 'category',
      align: 'center',
      ellipsis: true,
      width: 120,
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
              <Popconfirm title="是否要删除此教室？" onConfirm={() => {
              }}>
                <Button type={'primary'} danger icon={<DeleteOutlined/>}>删除</Button>
              </Popconfirm>
            </Space>
        )
      }
    },
  ]


  render() {
    const {isHideForm, data, formSearch, pageSize, categoryOptions} = this.props;
    const {dispatch,} = this.props;
    const searchItem: ProFormSearchItemArrays = [
      {
        label: '教室名称',
        name: 'name',
        children: <Input style={{width: '100%'}} placeholder={'请输入教室名称'}/>, ...searchFormItemLayout
      },
      {
        label: '教室类别', name: 'category', children: <Select placeholder={'请选择教室类别'} onFocus={() => {
          dispatch({type: 'classroomEdit/queryCategoryOptions'})
        }} options={categoryOptions.map(value => {
          return {label: value, value}
        })}
                                                           style={{width: '60%',}}/>, ...searchFormItemLayout
      },
      {
        label: '教室楼层', name: 'floor', children: <Input style={{width: '100%'}}
                                                       placeholder={'请输入教室楼层'}/>, ...searchFormItemLayout,
        rules: [{required: false, message: '请输入非0整数', pattern: /^-?[1-9][0-9]*$/}],
      },
      {
        label: '教学楼名称', name: 'build', children: <Input style={{width: '100%'}}
                                                        placeholder={'请输入教学楼名称'}/>, ...searchFormItemLayout
      },
      {
        label: '校区名称', name: 'campus', children: <Input style={{width: '100%'}}
                                                        placeholder={'请输入校区名称'}/>, ...searchFormItemLayout
      },

    ];
    return (
        <div>
          <ProFormSearch initialValues={formSearch} childrenItem={searchItem} isHide={isHideForm}
                         dispatch={dispatch} namespace={namespace} pageSize={pageSize}/>
          <div style={{textAlign: 'right', padding: '8px 16px 0 16px'}}>
            <Space><Button type={'primary'} onClick={event => {
              this.setState({classroomModalVisible: true})
            }}>新建教室</Button><Button type={'primary'}>批量导入</Button></Space>
            <Modal title={'创建新教室'} width={800} onCancel={e => {
              this.setState({classroomModalVisible: false})
            }} onOk={e => {
              this.setState({classroomModalVisible: false})
            }} visible={this.state.classroomModalVisible}>
              <ClassroomForm categoryOptions={categoryOptions} categoryFocus={() => {
                dispatch({type: 'classroomEdit/queryCategoryOptions'})
              }}/>
            </Modal>
          </div>
          <div className={'site-custom-background'} style={{marginTop: 8}}>

            <Table<ClassroomInformation> columns={this.columns} dataSource={data?.data?.map((value => {
              return {...value, key: value.id}
            }))} bordered scroll={{x: 700,}}

                                         pagination={{
                                           current: data?.page,
                                           pageSize: pageSize,
                                           total: data?.totalRows,
                                           pageSizeOptions: ['10', '20', '30', '50'],
                                           showLessItems: true,
                                           showSizeChanger: true,
                                           showQuickJumper: true,
                                           showTotal: (total, range) => `总计${total}个教室`,
                                           onShowSizeChange: (current, size) => {
                                             dispatch({
                                               type: 'classroomEdit/querySubmit',
                                               payload: {...formSearch, page: current, pageSize: size}
                                             })
                                             dispatch({
                                               type: 'classroomEdit/setSateProperty',
                                               payload: {dataIndex: 'pageSize', value: size}
                                             })
                                           },
                                           onChange: (page, pageSize) => {
                                             dispatch({
                                               type: 'classroomEdit/querySubmit',
                                               payload: {...formSearch, page, pageSize}
                                             })
                                           }

                                         }}
            />
          </div>

        </div>
    );
  }
}

export default connect((
    state:any) => {
      return {
        ...state[namespace],

      }
    }

)(ClassroomEdit);
