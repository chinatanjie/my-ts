import {PlusOutlined} from '@ant-design/icons';
import {Button, Input, Popconfirm, Table, message, Form, Space} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {ColumnsType} from "antd/es/table";
import {BuildingInformation, CampusInformation, ClassroomInformation} from "@/pages/eCard/data";
import {
  deleteBuilding,
  deleteCampus,
  getCampus,
  insertBuilding,
  insertCampus,
  updateBuilding,
  updateCampus
} from "@/pages/eCard/service";
import {SyncOutlined, PoweroffOutlined, EditOutlined, DeleteOutlined, SaveOutlined} from "@ant-design/icons/lib";


interface BuildEdit extends BuildingInformation {
  index: number;
}

const title: string = '校区和所属楼栋信息';
const subTitle: string = '校区和楼栋查询、增加、修改、删除操作.注意事项不能删除有楼栋的校区和有教室的楼栋，为了支持小型低功耗不能识别UTF-8中文编码设备，楼栋和校区均有要设置英文别名';

const CampusAndBuilding: FC<any> = () => {

  /**
   * 创建campus和build表单数据域,
   */
  const [formCampus] = Form.useForm();
  const [formBuild] = Form.useForm();

  /**
   * 设置state
   */
  const [loading, setLoading] = useState<boolean>(true);
  const [editKey, setEditKey] = useState<string>("");
  const [newEdit, setNewEdit] = useState(false);
  const [campus, setCampus] = useState<CampusInformation[]>([]);


  /**
   * 判断是否处于编辑状态
   * @param key
   */
  const isEdit = (key: string) => {
    return key === editKey;
  }

  /**
   * 产生楼栋key
   * @param id
   */
  const generateBuildKey = (id: number | string) => 'build' + id;

  /**
   * 新建校区，保存到sate中
   */
  const newCampusSate = () => {
    setNewEdit(true);
    formCampus.setFieldsValue({name: '', nameAlias: ''});
    let n = campus.slice();
    n.push({key: 'new' + campus.length});
    setCampus(n);
    setEditKey('new' + campus.length);
  }

  /**
   * 新建楼栋，保存到sate中
   * @param record 校区信息
   * @param index campus索引
   */
  const newBuildSate = (record: CampusInformation, index: number) => {
    setNewEdit(true);
    formBuild.setFieldsValue({name: '', nameAlias: '', floors: '', startFloor: ''});
    let n = campus.slice(); //产生一个新数组，不影响原来的campus
    if (!!n[index]?.buildings) {
      n[index]?.buildings?.push({key: 'newBuild' + ((campus[index]?.buildings?.length || 0) + 1), campus: record.name});

    } else {
      n[index].buildings = [{key: 'newBuild' + 1, campus: record.name}];
    }
    // console.log(n)
    setEditKey('newBuild' + n[index]?.buildings?.length);
    setCampus(n);

  }
  const cancelNewCampusSate = () => {
    let n = campus.slice();
    n.pop();
    setCampus(n);
    setEditKey("");
    setNewEdit(false);
  }
  const cancelNewBuildSate = (record: BuildingInformation, indexCampus: number) => {
    let n = campus.slice();
    n[indexCampus]?.buildings?.pop();
    setCampus(n);
    setEditKey("");
    setNewEdit(false);
  }

  const saveCampusSate = async (value: CampusInformation, isNew?: boolean) => {
    try {
      const item = await formCampus.validateFields() as CampusInformation;
      // console.log(item)
      const newData = [...campus];
      let findIndex = newData.findIndex(v => v.key === value.key);
      // console.log(newData)
      // console.log(findIndex)
      if (findIndex > -1) {
        const v = newData[findIndex];
        newData.splice(findIndex, 1, {...v, name: item.name, nameAlias: item.nameAlias})
      } else {
        newData.push({...value, name: item.name, nameAlias: item.nameAlias})
      }
      // console.log(newData)
      setLoading(true);
      if (!!isNew) {
        insertCampus({name: item.name as string, nameAlias: item.nameAlias as string}).then(reason => {
          if (reason?.data.success) {
            setCampus(newData);
            setEditKey('');
            setNewEdit(false);
            message.success(`新建校区:${item.name} 成功`)
          } else {
            message.error(`新建校区:${item.name} API失败:` + reason?.data.msg)
          }
        }).catch(reason => {
          message.error(`新建校区:${item.name} API连接失败:` + reason.toString())
        }).finally(() => {
          setLoading(false);
        })
      } else {
        const prev = value.name as string;
        updateCampus(prev, {name: item.name as string, nameAlias: item.nameAlias as string}).then(reason => {
          if (reason?.data.success) {
            setCampus(newData);
            setEditKey('');
            setNewEdit(false);
            message.success(`校区:${prev} 更新}成功`)
          } else {
            message.error(`校区:${prev} 更新API失败:` + reason?.data.msg)
          }
        }).catch(reason => {
          message.error(`请求更新校区:${prev} API连接失败:` + reason.toString())
        }).finally(() => {
          setLoading(false);
        })
      }

    } catch (e) {
      console.log('验证校区信息失败', e)
    }
  }

  const saveBuildSate = async (value: BuildingInformation, index: number, isNew?: boolean) => {
    try {
      const item = await formBuild.validateFields() as BuildingInformation;

      const newData = [...campus];
      const build: BuildingInformation[] = [...newData[index]?.buildings || []];
      let findIndex = build.findIndex(v => v.key === value.key);
      // console.log(findIndex)
      // console.log(build)
      // console.log(value)
      if (findIndex > -1) {
        newData[index]?.buildings?.splice(findIndex, 1, {
          ...value,
          name: item.name,
          nameAlias: item.nameAlias,
          floors: item.floors,
          startFloor: item.startFloor
        })
      } else {
        newData[index]?.buildings?.push({
          ...value,
          name: item.name,
          nameAlias: item.nameAlias,
          floors: item.floors,
          startFloor: item.startFloor
        })
      }
      setLoading(true);
      if (!!isNew) {
        insertBuilding({
          campus: value.campus as string,
          name: item.name as string,
          nameAlias: item.nameAlias as string,
          floors: item.floors as number,
          startFloor: item.startFloor as number
        }).then(reason => {
          if (reason?.status) {
            setCampus(newData);
            setEditKey('');
            setNewEdit(false);
            message.success(`新建楼栋:${value.campus}${item.name} 成功`)
          } else {
            message.error(`新建楼栋:${value.campus}${item.name} API失败:` + reason?.data.msg)
          }
        }).catch(reason => {
          message.error(`新建楼栋:${value.campus}${item.name} API连接失败:` + reason.toString())
        }).finally(() => {
          setLoading(false);
        })
      } else {
        const prevCampus = value.campus as string;
        const prevName = value.name as string;
        updateBuilding(prevCampus, prevName, {
          campus: value.campus as string,
          name: item.name as string,
          nameAlias: item.nameAlias as string,
          floors: item.floors as number,
          startFloor: item.startFloor as number
        }).then(reason => {
          if (reason?.data.success) {
            setCampus(newData);
            setEditKey('');
            setNewEdit(false);
            message.success(`楼栋:${value.campus}${value.name} 更新成功`)
          } else {
            message.error(`楼栋:${value.campus}${value.name} 更新API失败:` + reason?.data.msg)
          }
        }).catch(reason => {
          message.error(`请求更新楼栋:${value.campus}${value.name}  API连接失败:` + reason.toString())
        }).finally(() => {
          setLoading(false);
        })
      }

    } catch (e) {
      console.log('验证楼栋信息失败', e)
    }
  }

  const removeCampusSate = (prev: string) => {
    setLoading(true)
    deleteCampus(prev).then((value) => {
      if (value.data.success) {
        const newData = [...campus];
        let findIndex = newData.findIndex(v => v.name === prev) || -1;
        if (findIndex > -1) {
          newData.splice(findIndex, 1,)
        } else {
          newData.pop();
        }
        setCampus(newData);
        message.success(`删除校区:${prev} 成功`).then(r => {
        })
      } else {
        message.error(`删除校区:${prev} 失败: ${value.data.msg}`).then(r => {
        })
      }
    }, reason => {
      message.error(`删除校区:${prev} 信息api请求失败:${reason.toString()}`).then(r => {
      })
    }).finally(() => {
      setNewEdit(false)
      setEditKey('')
      setLoading(false)
    });
  }

  const removeBuildSate = (record: BuildEdit, index: number) => {
    setLoading(true)
    deleteBuilding({name: record.name as string, campus: record.campus as string}).then((value) => {
      if (value.data.success) {
        const newData = [...campus];
        let findIndex = newData[index]?.buildings?.findIndex(v => v.name === record.name) || -1;
        // console.log(findIndex)
        // console.log(newData)
        if (findIndex > -1) {
          newData[index]?.buildings?.splice(findIndex, 1,)
        } else {
          newData[index]?.buildings?.pop();
        }
        setCampus(newData);
        message.success(`删除楼栋:${record.campus}${record.name} 成功`)
      } else {
        message.error(`删除楼栋:${record.campus}${record.name} 失败: ${value.data.msg}`)
      }
    }, reason => {
      message.error(`删除楼栋:${record.campus}${record.name} api请求失败:${reason.toString()}`)
    }).finally(() => {
      setNewEdit(false)
      setEditKey('')
      setLoading(false)
    });
  }

  const updateCampusSate = () => {
    setLoading(true)
    getCampus({}).then((value) => {
      if (value?.data.success) {
        setCampus(value?.data.resultBody?.map((d => ({
          ...d, key: d.id, buildings: d.buildings?.map(value1 => {
            return {
              ...value1,
              key: generateBuildKey(value1.id as number),
              campus: d.name,
            }
          })
        }))));
        message.success('刷新校区信息成功')
      } else {
        message.error('刷新校区信息失败:' + value?.data.msg)
      }
    }, reason => {
      message.error('刷新校区信息API请求连接失败:' + reason.toString())
    }).finally(() => {
      setNewEdit(false)
      setEditKey('')
      setLoading(false)
    });
  }

  useEffect(() => {
    // let t = true;
    const timeID = setTimeout(() => {
      // console.log('start campus build')
      getCampus({}).then((value) => {
        // console.log("start")
        // if (t) {
        if (value?.data.success) {
          setCampus(value?.data.resultBody?.map((d => ({
            ...d, key: d.id, buildings: d.buildings?.map(value1 => {
              return {
                ...value1,
                key: generateBuildKey(value1.id as number),
                campus: d.name,
              }
            })
          }))));
          setLoading(false)
        } else {
          message.error('初始刷新页面失败:' + value?.data.msg)
        }
        // }
      }, reason => {
        message.error('初始刷新页面校区信息API请求失败:' + reason.toString())
      });
    }, 500);

    return () => {
      // console.log("exit")
      // t = false
      clearTimeout(timeID)
    }
  }, [])


  const columnsCampus: ColumnsType<CampusInformation> = [
    {
      title: '校区名称',
      dataIndex: 'name',
      key: 'name',
      width: '240px',
      align: 'center',
      ellipsis: true,
      render: (text: string, record: CampusInformation) => {
        if (isEdit(record.key as string)) {
          return (
              <Form.Item name={'name'} rules={[{required: true, message: '请输入校区'}]}>
                <Input autoFocus placeholder="校区名称"/>
              </Form.Item>
          );
        }
        return text;
      },
    }, {
      title: '校区名称别名',
      dataIndex: 'nameAlias',
      key: 'nameAlias',
      width: '240px',
      align: 'center',
      ellipsis: true,
      render: (text: string, record: CampusInformation) => {
        if (isEdit(record.key as string)) {
          return (
              <Form.Item name={'nameAlias'} rules={[{required: true, message: '请输入英文开头数字混合别名'}]}>
                <Input autoFocus placeholder="请输入英文开头数字混合别名"/>
              </Form.Item>
          );
        }
        return text;
      },
    }, {
      title: '楼栋数量',
      dataIndex: 'buildings',
      key: 'buildings',
      width: '120px',
      align: 'center',
      ellipsis: true,
      render: (text: string, record: CampusInformation) => {
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
      width: '200px',
      align: 'center',
      ellipsis: true,
      render: (text: string, record: CampusInformation) => {
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
      width: '200px',
      align: 'center',
      ellipsis: true,
      render: (text: string, record: CampusInformation) => {
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
      render: (text: any, record: CampusInformation) => {
        if (loading) {
          return null;
        }
        if (isEdit(record.key as string)) {
          if (newEdit) {
            return (
                <Space>
                  <Button type={'primary'} icon={<SaveOutlined/>} onClick={(e) => {
                    saveCampusSate(record, true).catch()
                  }}>添加</Button>
                  <Popconfirm title="是否要取消添加？" onConfirm={() => {
                    cancelNewCampusSate();
                  }}>
                    <Button type={'dashed'} icon={<PoweroffOutlined/>}>取消</Button>
                  </Popconfirm>
                </Space>
            );
          }
          return (
              <Space>
                <Button type={'primary'} icon={<SaveOutlined/>} onClick={(e) => {
                  saveCampusSate(record, false).catch()
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
                formCampus.setFieldsValue({name: record.name, nameAlias: record.nameAlias});
              }}>编辑</Button>
              <Popconfirm title="是否要删除此行？" disabled={editKey != ""} onConfirm={() => {
                removeCampusSate(record.name as string)
              }}>
                <Button type={'primary'} danger icon={<DeleteOutlined/>} disabled={editKey != ""}>删除</Button>
              </Popconfirm>
            </Space>
        );
      },
    },
  ];

  const columnsBuilding: ColumnsType<BuildEdit> = [
    {
      title: '楼栋名称',
      dataIndex: 'name',
      key: 'name',
      width: '200px',
      align: 'center',
      ellipsis: true,
      render: (text: string, record: BuildingInformation) => {
        if (isEdit(record.key as string)) {
          return (
              <Form.Item name={'name'} rules={[{required: true, message: '请输入校区名称'}]}>
                <Input autoFocus placeholder="教学楼名称"/>
              </Form.Item>
          );
        }
        return text;
      },
    }, {
      title: '楼栋名称别名',
      dataIndex: 'nameAlias',
      key: 'nameAlias',
      width: '200px',
      align: 'center',
      ellipsis: true,
      render: (text: string, record: BuildingInformation) => {
        if (isEdit(record.key as string)) {
          return (
              <Form.Item name={'nameAlias'} rules={[{required: true, message: '请输入校区别名'}]}>
                <Input autoFocus placeholder="英文开头别名"/>
              </Form.Item>
          );
        }
        return text;
      },
    }, {
      title: '楼层数量',
      dataIndex: 'floors',
      key: 'floors',
      width: '100px',
      align: 'center',
      ellipsis: true,
      render: (text: number, record: BuildingInformation) => {
        if (isEdit(record.key as string)) {
          return (
              <Form.Item name={'floors'} rules={[{required: true, message: '请输入总计楼层数'}]}>
                <Input autoFocus placeholder="楼层数量"/>
              </Form.Item>
          );
        }
        return text;
      },
    }, {
      title: '起始楼层',
      dataIndex: 'startFloor',
      key: 'startFloor',
      width: '100px',
      align: 'center',
      ellipsis: true,
      render: (text: number, record: BuildingInformation) => {
        if (isEdit(record.key as string)) {
          return (
              <Form.Item name={'startFloor'} rules={[{required: true, message: '请输入总计楼层数'}]}>
                <Input autoFocus placeholder="楼层数量"/>
              </Form.Item>
          );
        }
        return text;
      },
    }, {
      title: '教室数量',
      dataIndex: 'classrooms',
      key: 'classrooms',
      width: '100px',
      align: 'center',
      ellipsis: true,
      render: (text: ClassroomInformation[], record: BuildingInformation) => {
        if (isEdit(record.key as string)) {
          return <></>
        }
        return text?.length || 0;
      },
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: '200px',
      align: 'center',
      ellipsis: true,
      render: (text: Date, record: BuildingInformation) => {
        if (isEdit(record.key as string)) {
          return <></>
        }
        return text?.toLocaleString();
      },
    }, {
      title: '修改时间',
      dataIndex: 'lastTime',
      key: 'lastTime',
      width: '200px',
      align: 'center',
      ellipsis: true,
      render: (text: Date, record: BuildingInformation) => {
        if (isEdit(record.key as string)) {
          return <></>
        }
        return text?.toLocaleString();
      },
    }, {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text: any, record: BuildEdit) => {
        if (loading) {
          return null;
        }
        if (isEdit(record.key as string)) {
          if (newEdit) {
            return (
                <Space>
                  <Button type={'primary'} icon={<SaveOutlined/>} onClick={(e) => {
                    saveBuildSate(record, record.index, true).catch()
                  }}>添加</Button>
                  <Popconfirm title="是否要取消添加？" onConfirm={() => {
                    cancelNewBuildSate(record, record?.index);
                  }}>
                    <Button type={'dashed'} icon={<PoweroffOutlined/>}>取消</Button>
                  </Popconfirm>
                </Space>
            );
          }
          return (
              <Space>
                <Button type={'primary'} icon={<SaveOutlined/>} onClick={(e) => {
                  saveBuildSate(record, record.index).catch()
                }}>保存</Button>
                <Popconfirm title="是否要取消编辑？" onConfirm={() => {
                  saveCampusSate(record).catch()
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
                formBuild.setFieldsValue({
                  name: record.name,
                  nameAlias: record.nameAlias,
                  floors: record.floors,
                  startFloor: record.startFloor
                });
              }}>编辑</Button>
              <Popconfirm title="是否要删除此行？" disabled={editKey != ""} onConfirm={() => {
                removeBuildSate(record, record?.index)
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
        <Form form={formCampus} component={false}>
          <Table<CampusInformation>
              loading={loading}
              columns={columnsCampus}
              dataSource={campus}
              pagination={false}
              expandable={{
                expandedRowRender: (record, index) => {
                  return (<div>
                        <Form form={formBuild} component={false}>
                          <Table<BuildEdit> columns={columnsBuilding} pagination={false} bordered
                                            dataSource={record?.buildings?.map(value => {
                                              return {
                                                ...value,
                                                index: index,
                                              }
                                            })}/>
                        </Form>

                        <Button style={{width: '100%', marginTop: 16, marginBottom: 8}}
                                type="dashed" disabled={loading || editKey !== '' || newEdit} onClick={event => {
                          newBuildSate(record, index)
                        }}>
                          <PlusOutlined/> 新增楼栋 </Button>
                      </div>
                  )
                },
              }}

          />
        </Form>
        <div style={{width: '100%'}}>

          <Button style={{width: '50%', marginTop: 16, marginBottom: 8}}
                  type="dashed" disabled={loading || editKey !== '' || newEdit} onClick={event => {
            newCampusSate();

          }}>
            <PlusOutlined/> 新增校区
          </Button>
          <Button style={{width: '50%', marginTop: 16, marginBottom: 8}}
                  type="dashed" onClick={event => {
            updateCampusSate()
          }}>
            <SyncOutlined spin={loading}/> 刷新
          </Button>


        </div>

      </div>


  );
};

export default CampusAndBuilding;
