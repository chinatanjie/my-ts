import {PlusOutlined} from '@ant-design/icons';
import {Button, Input, Popconfirm, Table, message, Form, Space, } from 'antd';
import React, {FC, useEffect, useState} from 'react';


import {ColumnsType} from "antd/es/table";
import {
  ClassroomCategoryInformation,
} from "@/pages/eCard/data";
import {
  deleteClassroomCategory,

  getClassroomCategory, insertClassroomCategory, updateClassroomCategory,

} from "@/pages/eCard/service";
import {
  SyncOutlined,
  PoweroffOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  MinusCircleOutlined
} from "@ant-design/icons/lib";





const title: string = '教室分类预定义';
const subTitle: string = '教室类别新增、修改和删除，每个类别可以配置任意数量的设备模板.不能删除已在使用的教室类别!';

const ClassroomCategoryEdit: FC<any> = () => {
  const [formCategory] = Form.useForm();


  const [loading, setLoading] = useState<boolean>(true);
  const [editKey, setEditKey] = useState<string>("");
  const [newEdit, setNewEdit] = useState(false);
  const [category, setCategory] = useState<ClassroomCategoryInformation[]>([]);


  const isEdit = (key: string) => {
    return key === editKey;
  }


  const newCategorySate = () => {
    setNewEdit(true);
    formCategory.setFieldsValue({name: '', equipmentList: []});
    let n = category.slice();
    n.push({key: 'new' + category.length});
    setCategory(n);
    setEditKey('new' + category.length);
  }

  const cancelNewCategorySate = () => {
    let n = category.slice();
    n.pop();
    setCategory(n);
    setEditKey("");
    setNewEdit(false);
  }


  const saveCategorySate = async (value: ClassroomCategoryInformation, isNew?: boolean) => {
    try {
      const item = await formCategory.validateFields() as ClassroomCategoryInformation;
      // console.log(item)
      const newData = [...category];
      let findIndex = newData.findIndex(v => v.key === value.key);
      // console.log(newData)
      // console.log(findIndex)
      if (findIndex > -1) {
        const v = newData[findIndex];
        newData.splice(findIndex, 1, {...v, name: item.name,})
      } else {
        newData.push({...value, name: item.name,})
      }
      // console.log(newData)
      setLoading(true);
      if (!!isNew) {
        insertClassroomCategory({name: item.name as string,}).then(reason => {
          if (reason?.data.success) {
            setCategory(newData);
            setEditKey('');
            setNewEdit(false);
            message.success(`新建教室分类:${item.name} 成功`)
          } else {
            message.error(`新建教室分类:${item.name} API失败:` + reason?.data.msg)
          }
        }).catch(reason => {
          message.error(`新建教室分类:${item.name} API连接失败:` + reason.toString())
        }).finally(() => {
          setLoading(false);
        })
      } else {
        const prev = value.name as string;
        updateClassroomCategory(prev, {name: item.name as string, }).then(reason => {
          if (reason?.data.success) {
            setCategory(newData);
            setEditKey('');
            setNewEdit(false);
            message.success(`教室分类:${prev} 更新}成功`)
          } else {
            message.error(`教室分类:${prev} 更新API失败:` + reason?.data.msg)
          }
        }).catch(reason => {
          message.error(`请求更新教室分类:${prev} API连接失败:` + reason.toString())
        }).finally(() => {
          setLoading(false);
        })
      }

    } catch (e) {
      // console.log('验证教室分类信息失败', e)
    }
  }


  const removeCategorySate = (prev: string) => {
    setLoading(true)
    deleteClassroomCategory(prev).then((value) => {
      if (value.data.success) {
        const newData = [...category];
        let findIndex = newData.findIndex(v => v.name === prev) || -1;
        if (findIndex > -1) {
          newData.splice(findIndex, 1,)
        } else {
          newData.pop();
        }
        setCategory(newData);
        message.success(`删除教室分类:${prev} 成功`)
      } else {
        message.error(`删除教室分类:${prev} 失败: ${value.data.msg}`)
      }
    }, reason => {
      message.error(`删除教室分类:${prev} 信息api请求失败:${reason.toString()}`)
    }).finally(() => {
      setNewEdit(false)
      setEditKey('')
      setLoading(false)
    });
  }


  const updateCategorySate = () => {
    setLoading(true)
    getClassroomCategory({}).then((value) => {
      if (value.data.success) {
        setCategory(value?.data.resultBody?.map((d => ({
          ...d, key: d.id,

        }))));
        message.success('刷新教室分类信息成功')
      } else {
        message.error('刷新教室分类信息失败:' + value?.data.msg)
      }
    }, reason => {
      message.error('刷新教室分类信息API请求连接失败:' + reason.toString())
    }).finally(() => {
      setNewEdit(false)
      setEditKey('')
      setLoading(false)
    });
  }

  useEffect(() => {
    const timeID = setTimeout(() => {
      getClassroomCategory({}).then((value) => {
        if (value.data.success) {
          setCategory(value?.data.resultBody?.map((d => ({
            ...d, key: d.id,
          }))));
          setLoading(false)
        } else {
          message.error('初始化教室分类页面失败:' + value?.data.msg)
        }
        // }
      }, reason => {
        message.error('初始化教室分类页面API请求失败:' + reason.toString())
      });
    }, 500);
    return () => {
      clearTimeout(timeID)
    }
  }, [])


  const columnsClassroomCategory: ColumnsType<ClassroomCategoryInformation> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '90px',
      ellipsis: true,
      align: 'center',
      render: (text: string, record: ClassroomCategoryInformation) => {
        if (isEdit(record.key as string)) {
          return (
            <></>
          );
        }
        return text;
      },
    }, {
      title: '类别名称',
      dataIndex: 'name',
      key: 'name',
      width: '120px',
      align: 'center',
      ellipsis: true,
      render: (text: string, record: ClassroomCategoryInformation) => {
        if (isEdit(record.key as string)) {
          return (
            <Form.Item name={'name'} rules={[{required: true, message: '请输入类别名称'}]}>
              <Input autoFocus placeholder="类别名称"/>
            </Form.Item>
          );
        }
        return text;
      },
    }, {
      title: '设备数量',
      dataIndex: 'equipmentList',
      key: 'equipmentList',
      width: '80px',
      align: 'center',
      ellipsis: true,
      render: (text: string, record: ClassroomCategoryInformation) => {
        if (isEdit(record.key as string)) {
          return (
            <></>
          );
        }
        return text?.length || 0;
      },
    }, {
      title: '教室数量',
      dataIndex: 'classrooms',
      key: 'classrooms',
      width: '80px',
      align: 'center',
      ellipsis: true,
      render: (text: string, record: ClassroomCategoryInformation) => {
        if (isEdit(record.key as string)) {
          return (
            <></>
          );
        }
        return text?.length || 0;
      },
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: '180px',
      align: 'center',
      ellipsis: true,
      render: (text: string, record: ClassroomCategoryInformation) => {
        if (isEdit(record.key as string)) {
          return (
            <></>
          );
        }
        return text?.toLocaleString();
      },

    }, {
      title: '修改时间',
      dataIndex: 'lastTime',
      key: 'lastTime',
      width: '180px',
      align: 'center',
      ellipsis: true,
      render: (text: string, record: ClassroomCategoryInformation) => {
        if (isEdit(record.key as string)) {
          return (
            <></>
          );
        }
        return text?.toLocaleString();
      },
    }, {
      title: '操作',
      key: 'action',
      align: 'center',
      width: '180px',
      ellipsis: true,
      render: (text: any, record: ClassroomCategoryInformation) => {
        if (loading) {
          return null;
        }
        if (isEdit(record.key as string)) {
          if (newEdit) {
            return (
              <Space>
                <Button type={'primary'} icon={<SaveOutlined/>} onClick={(e) => {
                  saveCategorySate(record, true).catch()
                }}>添加</Button>
                <Popconfirm title="是否要取消添加？" onConfirm={() => {
                  cancelNewCategorySate();
                }}>
                  <Button type={'dashed'} icon={<PoweroffOutlined/>}>取消</Button>
                </Popconfirm>
              </Space>
            );
          }
          return (
            <Space>
              <Button type={'primary'} icon={<SaveOutlined/>} onClick={(e) => {
                saveCategorySate(record, false).catch()
              }}>保存</Button>
              <Popconfirm title="是否要取消编辑？" onConfirm={() => {
                setEditKey("")
              }}>
                <Button type={'dashed'} icon={<PoweroffOutlined/>}>取消</Button>
              </Popconfirm>
            </Space>
          );
        }
        return (
          <Space>
            <Button type={'primary'} icon={<EditOutlined/>} disabled={editKey != ""} onClick={(e) => {
              setEditKey(record.key as string);
              formCategory.setFieldsValue({name: record.name, nameAlias: record.equipmentList,});
            }}>编辑</Button>
            <Popconfirm title="是否要删除此行？" disabled={editKey != ""} onConfirm={() => {
              removeCategorySate(record.name as string)
            }}>
              <Button type={'primary'} danger icon={<DeleteOutlined/>} disabled={editKey != ""}>删除</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];


  return (

      <div>
        <Form form={formCategory} component={false}>
          <Table<ClassroomCategoryInformation>
            loading={loading}
            columns={columnsClassroomCategory}
            dataSource={category}
            pagination={false}
            expandedRowRender={(record, index) => {
              return (<div id={'categoryClassroom'}>
                  <Form.List name={'equipmentList'}>
                    {
                      (fields, {add, remove}) => {
                        let width = document.getElementById('categoryClassroom')?.clientWidth ?
                          document.getElementById('categoryClassroom')?.clientWidth as number > 700 ?
                            document.getElementById('categoryClassroom')?.clientWidth as number - 700
                            : document.getElementById('categoryClassroom')?.clientWidth as number - 64
                          : 0;

                        return (<div style={{marginBottom:16}}>
                            {fields.map((field, index) => (
                              <div
                                key={field.key} style={{marginBottom:16}}
                              >
                                <span>未定义设备&nbsp;:&nbsp;</span>
                                <Form.Item {...field}
                                           name={[field.name, 'jsonName']} key={field.fieldKey * 100 + 101}
                                           noStyle>
                                  <Input placeholder='请输入设备JSON字段名' style={{width: 180}}/>
                                </Form.Item>
                                <span>-</span>
                                <Form.Item {...field}
                                           name={[field.name, 'configureName']} key={field.fieldKey * 100 + 102}
                                           noStyle>
                                  <Input placeholder="请输入设备显示名称" style={{width: 180}} onChange={event => {

                                  }}/>
                                </Form.Item>
                                <span>-</span>
                                <Form.Item {...field}
                                           name={[field.name, 'configureJsonName']}
                                           key={field.fieldKey * 100 + 103}
                                           noStyle>
                                  <Input placeholder='请输入设备JSON字段重命名' style={{width: 200}}/>
                                </Form.Item>
                                <span>-</span>
                                <Form.Item {...field}
                                           name={[field.name, 'arrayConfig']} key={field.fieldKey * 100 + 104}
                                           noStyle>
                                  <Input placeholder="请输入设备名称集合"
                                         style={{
                                           width
                                         }}/>
                                </Form.Item>
                                <MinusCircleOutlined
                                  className={'dynamic-delete-button'}
                                  style={{margin: '0 8px'}}
                                  onClick={() => {
                                    console.log(field)
                                    remove(field.name);
                                  }}
                                />
                              </div>

                            ))}
                            <Form.Item label={' '} colon={false}>
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

                            </Form.Item>
                          </div>
                        )
                      }}

                  </Form.List>
                  <Button style={{width: '100%', marginTop: 16, marginBottom: 8}}
                          type="dashed" disabled={loading || editKey !== '' || newEdit} onClick={event => {

                  }}>
                    <PlusOutlined/> 新增设备 </Button>
                </div>
              )
            }}
          />
        </Form>
        <div style={{width: '100%'}}>

          <Button style={{width: '50%', marginTop: 16, marginBottom: 8}}
                  type="dashed" disabled={loading || editKey !== '' || newEdit} onClick={event => {
            newCategorySate();

          }}>
            <PlusOutlined/> 新增教室类别
          </Button>
          <Button style={{width: '50%', marginTop: 16, marginBottom: 8}}
                  type="dashed" onClick={event => {
            updateCategorySate()
          }}>
            <SyncOutlined spin={loading}/> 刷新
          </Button>


        </div>

      </div>



  );
};

export default ClassroomCategoryEdit;
