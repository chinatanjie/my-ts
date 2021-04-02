import React from "react";
import {Checkbox, Form, Button, Space, Select, Input} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons/lib";


const {Item, List} = Form;

interface ClassroomFormProps {
  categoryOptions: string[];
  categoryFocus?:Function;
}

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
}

const ClassroomForm: React.FC<ClassroomFormProps> = (props) => {

  const [form] = Form.useForm();
  const [device, setDevice] = React.useState<string[]>([]);
  const {categoryOptions,categoryFocus} = props;

  return (
    <div className={'site-layout-background'}>
      <Form {...formItemLayout} form={form} initialValues={{}}
            layout={'horizontal'}
            onFinish={values => {
              console.log(values)
            }} name={'test'} onReset={event => {
        console.log(event)
        form.resetFields();
      }}>
        <Item label={'教室类别'} required={true}>
          <Item name={'category'} noStyle>
            <Select style={{width: 240}} options={categoryOptions.map(value => {
              return {label: value, value}
            })} placeholder={'请选择教室类别'} onFocus={()=>{categoryFocus&&categoryFocus()}}/>
          </Item>
          <Checkbox style={{marginLeft: 16}}>是否使用默认模板</Checkbox>
        </Item>

        <Item label={'教学楼'}>
          <Item name={'campus'} noStyle>
            <Select placeholder={'请选择校区'} style={{width: 160, marginRight: 16}}/>
          </Item>
          <Item name={'build'} noStyle>
            <Select placeholder={'请选择楼栋'} style={{width: 160, marginRight: 16}}/>
          </Item>
          <Item name={'floor'} noStyle>
            <Select placeholder={'楼层'} style={{width: 100}}/>
          </Item>
        </Item>
        <Item label={'教室名称'} required>
          <Item name={'name'} noStyle rules={[{required: true, message: '请输入教室名称'}]}>
            <Input style={{width: 220}} placeholder={'请输入教室名称'}/>
          </Item>
        </Item>
        <Item label={'终端序列号及IP'}>
          <Item name={'terminalID'} noStyle>
            <Input style={{width: 220}} placeholder={'请输入终端出厂序列号'}/>
          </Item>
          <label>-</label>
          <Item name={'terminalIP'} noStyle>
            <Input style={{width: 220}} placeholder={'请输入终端IP:端口'}/>
          </Item>
        </Item>
        <List name={'rtsp'}>
          {
            (fields, {add, remove}) => {
              return (<div>
                  {fields.map((field, index) => (

                    <div
                      key={field.key}
                    >
                      <Item {...formItemLayout} label={(field.key + 1) + '#摄像头名称及产品序列号'} required>
                        <Item {...field}
                              name={[field.name, 'name']} key={field.fieldKey * 100 + 101} noStyle>
                          <Input placeholder="请输入摄像头名字" style={{width: 220}}/>
                        </Item>
                        <span>-</span>
                        <Item {...field}
                              name={[field.name, 'serialNumber']} key={field.fieldKey * 100 + 102} noStyle>
                          <Input placeholder="请输入摄像头序列号" style={{width: 220}}/>
                        </Item>
                        <MinusCircleOutlined
                          className={'dynamic-delete-button'}
                          style={{margin: '0 8px'}}
                          onClick={() => {
                            console.log(field)
                            remove(field.name);
                          }}
                        />
                      </Item>
                      <Item {...formItemLayout}
                            {...field}
                            label={(field.key + 1) + '#摄像头视频主码流'} required
                            name={[field.name, 'mainStream']} key={field.fieldKey * 100 + 103}
                      >
                        <Input placeholder="请输入主码流地址" style={{width: 480}}/>
                      </Item>
                      <Item {...formItemLayout}
                            {...field}
                            label={(field.key + 1) + '#摄像头视频副码流'} required
                            name={[field.name, 'viceStream']} key={field.fieldKey * 100 + 104}>
                        <Input placeholder="请输入副码流地址" style={{width: 480}}/>
                      </Item>
                    </div>

                  ))}
                  <Item label={' '} colon={false}>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                        console.log(fields)
                      }}
                      style={{width: 180}}
                    >
                      <PlusOutlined/>新增摄像头
                    </Button>

                  </Item>
                </div>
              )
            }}

        </List>
        <List name={'equipmentList'}>
          {
            (fields, {add, remove}) => {
              return (<div>
                  {fields.map((field, index) => (

                    <div
                      key={field.key}
                    >
                      <Item {...formItemLayout}
                            label={(device[index] || form.getFieldValue('equipmentList')[index]?.configureName || '未定义名称') + '-预定义JSON及名称'}
                            required>
                        <Item {...field}
                              name={[field.name, 'jsonName']} key={field.fieldKey * 100 + 101} noStyle>
                          <Input placeholder='请输入设备JSON字段名' style={{width: 220}}/>
                        </Item>
                        <span>-</span>
                        <Item {...field}
                              name={[field.name, 'configureName']} key={field.fieldKey * 100 + 102} noStyle>
                          <Input placeholder="请输入设备显示名称" style={{width: 220}} onChange={event => {
                            let temp = device.slice();
                            temp[index] = event.target.value;
                            setDevice(temp);
                          }}/>
                        </Item>
                        <MinusCircleOutlined
                          className={'dynamic-delete-button'}
                          style={{margin: '0 8px'}}
                          onClick={() => {
                            console.log(field)
                            remove(field.name);
                          }}
                        />
                      </Item>
                      <Item {...formItemLayout}
                            label={(device[index] || form.getFieldValue('equipmentList')[index]?.configureName || '未定义名称') + '-JSON字段重命名或序列号'}>
                        <Item {...field}
                              name={[field.name, 'configureJsonName']} key={field.fieldKey * 100 + 103} noStyle>
                          <Input placeholder='请输入设备JSON字段重命名' style={{width: 220}}/>
                        </Item>
                        <span>-</span>
                        <Item {...field}
                              name={[field.name, 'serialNumber']} key={field.fieldKey * 100 + 104} noStyle>
                          <Input placeholder="请输入设备序列号" style={{width: 220}}/>
                        </Item>
                      </Item>
                    </div>

                  ))}
                  <Item label={' '} colon={false}>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                        console.log(fields)
                      }}
                      style={{width: 180}}
                    >
                      <PlusOutlined/>新增设备
                    </Button>

                  </Item>
                </div>
              )
            }}

        </List>


        <Item label={' '} colon={false}>
          <Space>
            <Button type={'primary'} htmlType={'submit'}>确认</Button>
            <Button type={'primary'} htmlType={'reset'}>重置</Button>
          </Space>
        </Item>
      </Form>
    </div>
  )

}


export default ClassroomForm;
