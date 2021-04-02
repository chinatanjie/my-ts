import {Table} from "antd";

import React from "react";

import {GenericResult} from "@/utils/request";

import {DataSource,} from "@/components/ProTable/data";
import {ColumnsType, TableProps} from "antd/es/table";

import {Dispatch} from "@/redux/data";


export interface ProTableProps<D> {
  tableProps?: TableProps<D>;
  title: string;
  namespace: string;
  data: GenericResult<D[]>;
  columns: ColumnsType<D>;

  dispatch: Dispatch;
  pageSize: number;
  formSearch: any;
}

class ProTable<T extends DataSource> extends React.Component<ProTableProps<T>, any> {

  constructor(props: ProTableProps<T>, context: any) {
    super(props, context);
  }

  render() {
    const {namespace, data, columns, pageSize, dispatch, formSearch, tableProps, title} = this.props;
    return (<Table<T> columns={columns} dataSource={data.data} bordered scroll={{x: 800}}
                      loading={false}
                      pagination={{
                        current: data?.page,
                        pageSize: pageSize,
                        total: data?.totalRows || 0,
                        pageSizeOptions: ['10', '20', '30', '50'],
                        showLessItems: true,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `总计${total}个${title}`,
                        onShowSizeChange: (current, size) => {
                          dispatch({
                            type: `${namespace}/querySubmit`,
                            payload: {...formSearch, page: current, pageSize: size}
                          });
                          dispatch({
                            type: `${namespace}/setSateProperty`,
                            payload: {dataIndex: 'pageSize', value: size}
                          });
                        },
                        onChange: (page, pageSize) => {
                          dispatch({
                            type: `${namespace}/querySubmit`,
                            payload: {...formSearch, page, pageSize}
                          })
                        }
                      }} {...tableProps}

    />)
  }

}

export default ProTable;
