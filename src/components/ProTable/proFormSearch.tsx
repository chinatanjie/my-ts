import React from "react";
import {
  Col,
  Form,
  Row,
  Button,
  Checkbox,
  Space,
  Tooltip, Switch,
} from "antd";

import {
  DownOutlined,
  RedoOutlined,
  SearchOutlined,
  UpOutlined,

} from "@ant-design/icons/lib";
import {FormItemProps} from "antd/lib/form/FormItem";
import {calculateGridRows} from "@/utils/responsive";
import {Dispatch} from "@/redux/data";

/**
 * 查询表格通用搜索框
 */

const {Item} = Form;


let globalResizeTimeout = false;

export interface ProFormFields {
  fuzzy?: boolean;
  ASC?: boolean;
}

export interface ProFormSearchItemArrays extends Array<FormItemProps> {
}


export interface ProFormSearchProps {
  /**
   *是否隐藏扩展搜索项
   */
  isHide: boolean;
  setHide?: (value: boolean) => void;
  /**
   * Form 子Item项
   */
  childrenItem: ProFormSearchItemArrays;

  /**
   * 父组件id
   */
  parentID?: string;
  /**
   * 确认参数
   * @param value
   */
  finish?: (value: any) => void;
  /**
   * 字段发生变化回调
   * @param changeValues
   * @param allValues
   */
  fieldsChange?: (changeValues: any, allValues: any) => void;
  /**
   * 重设函数
   */
  reset?: Function;
  /**
   * 初始值
   */
  initialValues: { [name: string]: any };

  /**
   * 相关state的namespace
   */
  namespace: string;
  dispatch: Dispatch;
  pageSize:number;


}

const ProFormSearch: React.FC<ProFormSearchProps> = (props) => {
  const [form] = Form.useForm();

  /**
   * 展开按钮tooltip提示设置是否显示
   */
  const [visible, setVisible] = React.useState(false);
  const [gridRowsMax, setGridRowsMax] = React.useState<number>();
  const {isHide, setHide, childrenItem, finish, reset, initialValues, fieldsChange, dispatch, namespace,pageSize} = props;

  let colNormal: any = isHide ? {xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6} : {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    xxl: 8
  };
  // console.log(document.getElementById('proForm')?.clientWidth as number)
  React.useEffect(() => {
    window.addEventListener('resize', refresh)
    return () => {
      console.log(gridRowsMax)
      window.removeEventListener('resize', refresh)
    }
  }, [])
  const refresh = (e: any) => {
    if (!globalResizeTimeout) {
      globalResizeTimeout = true;
      // console.log('resize')
      setTimeout(() => {
        globalResizeTimeout = false;
        setGridRowsMax(calculateGridRows(colNormal));
        // console.log(e)
      }, 300)
    }
  }

  /**
   * 生成表单输入项目，同时处理收起和展开
   */
  const handleGeneratorItem = () => {
    colNormal = isHide ? {xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6} : {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 8,
      xxl: 8
    };

    const rowMax = calculateGridRows(colNormal);
    let display: React.FC[] = [];
    // console.log(isHide)
    // console.log(rowMax)
    if (isHide) {
      if (childrenItem.length < rowMax) {
        let xt = rowMax - childrenItem.length - 1;
        for (let i = 0; i < xt; i++) {
          display.push(() => <div></div>)
        }
      }

    } else {
      let xy = rowMax - (childrenItem.length % rowMax) - 1;
      for (let i = 0; i < xy; i++) {
        display.push(() => <div></div>)
      }

    }


    return (
      <>
        {
          childrenItem.map((value, index) => {
            if (isHide) {
              if (index < (rowMax - 1)) {
                return (
                  <Col {...colNormal} key={index} style={{textAlign: 'left'}}>
                    <Item {...value} ></Item>
                  </Col>
                )
              } else {
                return undefined
              }

            } else {
              return (
                <Col {...colNormal} key={index}>
                  <Item {...value} ></Item>
                </Col>
              )
            }

          })
        }
        {
          display.map((Value, index) => {
            return <Col {...colNormal} key={index + 100} style={{textAlign: 'left'}}><Value/></Col>
          })
        }
      </>
    );
  }

  /**
   * 设置收起或展开state值
   * @param value
   */
  const handleHide = (value: boolean) => {
    dispatch({
      type: `${namespace}/setSateProperty`,
      payload: {dataIndex: 'isHideForm', value}
    })
  };

  const handleSubmit = (value: any) => {
    dispatch({type: `${namespace}/querySubmit`, payload: {...value,pageSize}})
    dispatch({type: `${namespace}/setSateProperty`, payload: {dataIndex: 'formSearch', value}})
  };
  const handleReset = () => {
    dispatch({
      type: `${namespace}/setSateProperty`,
      payload: {dataIndex: 'formSearch', value: {ASC: true}}
    })
  }

  const handleFieldsChange = (value: any) => {
    dispatch({
      type: `${namespace}/setFormSearch`,
      payload: {dataIndex: value[0].name, value: value[0].value}
    })
  }

  return (
    <div className={'site-custom-background'} style={{padding: '16px 16px 0 16px'}}>
      <Form className="ant-advanced-search-form "
            labelAlign={'right'}
            form={form}
            initialValues={initialValues}
            onFinish={values => {
              handleSubmit(values);
              finish?.(values);
            }} onFieldsChange={(changedFields, allFields) => {
        if (changedFields.length > 0) {
          handleFieldsChange(changedFields);
          fieldsChange?.(changedFields, allFields);
        }
      }}
      >
        <div id={'proForm'}>
          <Row gutter={{xs: 24, sm: 24, md: 12, lg: 8, xl: 8, xxl: 8}} justify={'space-between'} align='middle'>
            {handleGeneratorItem()}
            <Col {...colNormal} style={{textAlign: 'right'}}>
              <Space size={'small'} direction={'horizontal'} align='center'>
                <Tooltip title="是否启用模糊匹配查询"
                         getPopupContainer={() => (document.getElementById('proForm') as HTMLElement)}>
                  <Item name="fuzzy" valuePropName="checked">
                    <Checkbox>模糊</Checkbox>
                  </Item>
                </Tooltip>
                <Tooltip title="数据排序方式" getPopupContainer={() => (document.getElementById('proForm') as HTMLElement)}>
                  <Item name="ASC" valuePropName="checked">
                    <Switch checkedChildren={'升序'} unCheckedChildren={'降序'}/>
                  </Item>
                </Tooltip>
                <Item>
                  <Space size={'middle'} direction={'horizontal'}>
                    <Tooltip title="查询" getPopupContainer={() => (document.getElementById('proForm') as HTMLElement)}>
                      <Button shape={'circle'} type="primary" htmlType="submit" icon={<SearchOutlined/>}></Button>
                    </Tooltip>
                    <Tooltip title="清除" getPopupContainer={() => (document.getElementById('proForm') as HTMLElement)}>
                      <Button type="primary" danger htmlType={'button'} icon={<RedoOutlined/>} onClick={() => {
                        setTimeout(() => {
                          form.resetFields()
                        }, 200);
                        handleReset();
                        reset?.();
                      }}/>
                    </Tooltip>
                    <Tooltip title={isHide ? '展开' : '收起'} mouseLeaveDelay={0.1} id={'toolTipHide'} visible={visible}
                             getPopupContainer={() => (document.getElementById('proForm') as HTMLElement)}>
                      <div onMouseOver={() => {
                        setVisible(true);
                      }}
                           onMouseEnter={() => {
                           }}
                           onMouseLeave={() => {
                             setVisible(false);
                           }}
                           onMouseOut={() => {
                             setVisible(false);
                           }}>
                        <Button shape={'round'} type="primary" htmlType={'button'} onClick={event => {
                          setVisible(false);
                          handleHide(!isHide);
                          setHide?.(!isHide);
                        }}
                                icon={isHide ? <DownOutlined/> : <UpOutlined/>}>
                        </Button>
                      </div>

                    </Tooltip>
                  </Space>
                </Item>
              </Space>
            </Col>
          </Row>
        </div>

      </Form>
    </div>

  )
}
export default ProFormSearch;
