import {PlusOutlined, UpOutlined, DownOutlined} from '@ant-design/icons';
import {Button, Divider, Dropdown, Menu, message, Input, Table, Form, Row, Col, DatePicker} from 'antd';
import React, {useState, useRef} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, {FormValueType} from './components/UpdateForm';
import {ICInformation, TableListItem, TeacherInformationType} from './data.d';
import {queryRule, updateRule, addRule, removeRule} from './service';
import {ColumnsType,ColumnType} from "antd/lib/table/interface";
import RadioGroup from "antd/lib/radio/group";
import Radio from "antd/lib/radio";


const {RangePicker} = DatePicker;
const FormItem = Form.Item;
const title: string = '教师信息';
const subTitle: string = '教师基础信息、名下IC卡编辑查询等操作';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dateFormat = 'YYYY/MM/DD';
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{tmp:ColumnsType<TeacherInformationType>}> = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState({});
  const [display, setDisplay] = useState({select: 'flex'});
  const columns: ColumnsType<TeacherInformationType> = [{
    key: 'name',
    title: '姓名',
    dataIndex: 'name',
    width: 150,
    fixed: "left",
    align: "left",
  }, {
    key: 'employeeID',
    title: '工号',
    dataIndex: 'employeeID',
    width: 150,
    fixed: "left",
    align: "left",
  }, {
    key: 'sex',
    title: '性别',
    dataIndex: 'sex',
    width: 80,
    align: 'center',
  }, {
    key: 'date',
    title: '出生日期',
    dataIndex: 'birth',
    width: 150,
    align: 'center',
  }, {
    key: 'departmentName',
    title: '部门',
    dataIndex: 'departmentName',
    width: 150,
    align: 'center',
  }, {
    key: 'cardID',
    title: '身份证号码',
    dataIndex: 'cardID',
    width: 250,
    align: 'center',
  }, {
    key: 'phone',
    title: '电话',
    dataIndex: 'phone',
    width: 150,
    align: 'center',
  }, {
    key: 'mail',
    title: '邮箱',
    dataIndex: 'mail',
    width: 250,
    align: 'left',
  }, {
    key: 'hire',
    title: '入职日期',
    dataIndex: 'hire',
    width: 150,
    align: 'left',
  }, {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    width: 150,
    align: 'left',
  }, {
    key: 'remarks',
    title: '备注',
    dataIndex: 'remarks',
    width: 150,
    align: 'left',
  },];
  const columnsSub: ColumnsType<ICInformation> = [{
    key: 'physicalID',
    title: '物理卡号',
    dataIndex: 'physicalID',
    width: 120,
    align: 'center',
  }, {
    key: 'cardNO',
    title: '卡面编号',
    dataIndex: 'cardNO',
    width: 120,
    align: 'center',
  }, {
    key: 'category',
    title: '类别',
    dataIndex: 'category',
    width: 80,
    align: 'center',
  }, {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    width: 80,
    align: 'center',
  }, {
    key: 'registrationDate',
    title: '登记日期',
    dataIndex: 'registrationDate',
    width: 80,
    align: 'center',
  }, {
    key: 'remarks',
    title: '备注',
    dataIndex: 'remarks',
    width: 80,
    align: 'center',
  },];
  const data: TeacherInformationType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `李大嘴${i}`,
      sex: '男',
      employeeID: `tx232424234${i}`,
      birth: '2020-09-30',
      cardID: `42111319880101239${i}`,
      phone: '13409908786',
      mail: 'testosl@163.com',
      departmentName: `东区第${i}班`,
      ics: [
        {
          key: 1,
          physicalID: '2ae322334',
          cardNO: '322002f23',
          category: '教师',
          status: '激活',
          idNO: '23322'
        }, {
          key: 2,
          physicalID: '4ae322334',
          cardNO: '422002f23',
          category: '教师',
          status: '锁定',
          idNO: '23320'
        },
      ]

    });
  }

  // function onSelectChange(selectedRowKeys:any) {
  //   console.log('selectedRowKeys changed: ', selectedRowKeys);
  //   this.setState({ selectedRowKeys });
  // }
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: this.onSelectChange,
  // };
// window.addEventListener('resize',()=>{
//   console.log("resize")});
// props.tmp=columns;
  return (
    <PageHeaderWrapper breadcrumb={{}} onBack={() => window.history.back()} title={title} subTitle={subTitle}>
      <div>
        <Form className="ant-advanced-search-form " onFinish={values => {
          console.log(values)
          values.hire[0] = values.hire[0].format('YYYY-MM-DD')
          console.log(JSON.stringify(values))
        }}
              onFinishFailed={errorInfo => {
                console.log(errorInfo)
              }}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 ,xl:48}} justify={'space-between'}>

            {
              columns.map((post:ColumnType<TeacherInformationType>)=>{
              return (
                <Col  xs={24} sm={24} md={12} lg={8} xl={6}>
                  <FormItem
                    label={post.title}
                    labelCol={{span: 6}}
                    wrapperCol={{span: 18}}
                  >
                    <Input placeholder="请输入搜索教师姓名" size="middle"/>
                  </FormItem>
                </Col>
              )

              })
            }
            {/*<Col  xs={24} sm={24} md={12} lg={8} xl={6}>*/}
            {/*  <FormItem*/}
            {/*    label="姓名"*/}
            {/*    labelCol={{span: 6}}*/}
            {/*    wrapperCol={{span: 18}}*/}
            {/*  >*/}
            {/*    <Input placeholder="请输入搜索教师姓名" size="middle"/>*/}
            {/*  </FormItem>*/}
            {/*</Col>*/}


            {/*<Col  xs={24} sm={24} md={12} lg={8} xl={6}>*/}
            {/*  <FormItem*/}
            {/*    label="出生日期"*/}
            {/*    labelCol={{span: 6}}*/}
            {/*    wrapperCol={{span: 18}}*/}
            {/*  >*/}
            {/*    <RangePicker size="middle"/>*/}
            {/*  </FormItem>*/}
            {/*</Col>*/}


          {/*  <Col xs={24} sm={24} md={12} lg={8} xl={6}>*/}

          {/*    <FormItem*/}
          {/*      label="入职日期"*/}
          {/*      name={'hire'}*/}
          {/*      labelCol={{span: 8}}*/}
          {/*      wrapperCol={{span: 18}}*/}
          {/*      style={{display: display.select}}*/}
          {/*    >*/}
          {/*      <RangePicker size="middle" format={dateFormat}/>*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*  <Col xs={24} sm={24} md={12} lg={8} xl={6}>*/}

          {/*    <FormItem*/}
          {/*      label="入职日期"*/}
          {/*      name={'hire'}*/}
          {/*      labelCol={{span: 8}}*/}
          {/*      wrapperCol={{span: 18}}*/}
          {/*      style={{display: display.select}}*/}
          {/*    >*/}
          {/*      <RangePicker size="middle" format={dateFormat}/>*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*  <Row gutter={6} justify={'space-between'}>*/}
          {/*  <Col   xs={24} md={12} lg={8}>*/}
          {/*    <FormItem*/}
          {/*      label="工号"*/}
          {/*      labelCol={{span: 8}}*/}
          {/*      wrapperCol={{span: 16}}*/}
          {/*    >*/}
          {/*      <Input placeholder="请输入搜索工号" size="middle"/>*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*  <Col   xs={24} md={12} lg={8}>*/}
          {/*    <FormItem*/}
          {/*      label="工号"*/}
          {/*      labelCol={{span: 8}}*/}
          {/*      wrapperCol={{span: 16}}*/}
          {/*    >*/}
          {/*      <Input placeholder="请输入搜索工号" size="middle"/>*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
              <Col xs={24} md={12} lg={8} style={{textAlign: 'right'}}>
                <Button style={{marginLeft: 10}} type="primary" htmlType="submit">搜索</Button>
                <Button style={{marginLeft: 10}} htmlType={'reset'}>清除条件</Button>
                <Button style={{marginLeft: 10}} onClick={() => {
                  setDisplay({select: display.select == 'flex' ? 'none' : 'flex'})
                }}>{display.select == 'flex' ? '收起' : '展开'}{display.select == 'flex' ? <UpOutlined/> :
                  <DownOutlined/>}</Button>
              </Col>
            {/*<Col span={6}>*/}
            {/*  <FormItem*/}
            {/*    label="性别"*/}
            {/*    name={'sex'}*/}
            {/*    labelCol={{span: 8}}*/}
            {/*    wrapperCol={{span: 16}}*/}
            {/*    style={{display: display.select}}*/}
            {/*  >*/}
            {/*    <RadioGroup>*/}
            {/*      <Radio value="male">男</Radio>*/}
            {/*      <Radio value="female">女</Radio>*/}
            {/*    </RadioGroup>*/}
            {/*  </FormItem>*/}
            {/*</Col>*/}
            {/*<Col span={6}>*/}
            {/*  <FormItem*/}
            {/*    label="邮箱"*/}
            {/*    labelCol={{span: 8}}*/}
            {/*    wrapperCol={{span: 18}}*/}
            {/*    style={{display: display.select}}*/}
            {/*  >*/}
            {/*    <Input placeholder="请输入搜索邮箱" size="middle"/>*/}
            {/*  </FormItem>*/}
            {/*</Col>*/}


            {/*<Col span={6}>*/}
            {/*  <FormItem*/}
            {/*    label="院系"*/}
            {/*    labelCol={{span: 8}}*/}
            {/*    wrapperCol={{span: 16}}*/}
            {/*  >*/}
            {/*    <Input placeholder="请输入搜索院系" size="middle"/>*/}
            {/*  </FormItem>*/}
            {/*</Col>*/}
            {/*<Col span={6}>*/}
            {/*  <FormItem*/}
            {/*    label="身份证"*/}
            {/*    labelCol={{span: 8}}*/}
            {/*    wrapperCol={{span: 16}}*/}
            {/*    style={{display: display.select}}*/}
            {/*  >*/}
            {/*    <Input placeholder="请输入搜索身份证号" size="middle"/>*/}
            {/*  </FormItem>*/}
            {/*</Col>*/}
            {/*<Col span={6}>*/}
            {/*  <FormItem*/}
            {/*    label="电话"*/}
            {/*    name={'phone'}*/}
            {/*    labelCol={{span: 8}}*/}
            {/*    wrapperCol={{span: 16}}*/}
            {/*    style={{display: display.select}}*/}
            {/*  >*/}
            {/*    <Input placeholder="请输入搜索电话" size="middle"/>*/}
            {/*  </FormItem>*/}
            {/*</Col>*/}


          </Row>
          {/*<Row>*/}
          {/*  <Col span={12} offset={12} style={{textAlign: 'right'}}>*/}
          {/*    <Button style={{marginLeft: 10}} type="primary" htmlType="submit">搜索</Button>*/}
          {/*    <Button style={{marginLeft: 10}} htmlType={'reset'}>清除条件</Button>*/}
          {/*    <Button style={{marginLeft: 10}} onClick={() => {*/}
          {/*      setDisplay({select: display.select == 'flex' ? 'none' : 'flex'})*/}
          {/*    }}>{display.select == 'flex' ? '收起' : '展开'}{display.select == 'flex' ? <UpOutlined/> :*/}
          {/*      <DownOutlined/>}</Button>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
        </Form>
        <div style={{marginBottom: 16, paddingLeft: 20}}>
          <Button type="primary" style={{marginLeft: 10}}>批量删除</Button>
          <Button type="primary" style={{marginLeft: 10}}>批量解锁</Button>
          <Button type="primary" style={{marginLeft: 10}}>批量锁定</Button>

        </div>
        <Table<TeacherInformationType> columns={columns} dataSource={data} loading={true} pagination={{
          hideOnSinglePage: true,
          pageSizeOptions: ['20', '50', '70', '100'], pageSize: 50, total: 50, onChange: (page, pageSize) => {
            console.log(page)
            console.log(pageSize)
          }, onShowSizeChange: (current, size) => {
            console.log(current)
            console.log(size)
          }
        }}
                                       scroll={{x: 700, y: 800}}
                                       bordered
                                       rowSelection={{}}
                                       expandedRowRender={record => {
                                         return (
                                           <Table<ICInformation> columns={columnsSub} dataSource={record.ics}


                                           />)
                                       }}
        />
      </div>
    </PageHeaderWrapper>
  );
};

export default TableList;
