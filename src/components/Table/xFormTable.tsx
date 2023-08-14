import React from 'react';
import { Props } from "@floating-ui/react-dom-interactions";
import { EditableProTable } from "@ant-design/pro-table";

// 定义表格列配置的接口
interface TableColumn {
    key: string;
    dataIndex: string;
    // 可以根据实际情况添加其他属性
}

// 定义表格数据项的接口
interface TableDataItem {
    id: number;
    key: string;
    value: string;
    description: string;
    // 可以根据实际情况添加其他属性
}

// 定义 xFormComponent 组件的属性接口
interface xFormProps {
    dataSource: TableDataItem[];
    setDataSource: (data: TableDataItem[]) => void;
    setEditableRowKeys: (keys: React.Key[]) => void;
    extra?: (recordList: TableDataItem[]) => void;
    editableKeys: React.Key[];
}

// xFormComponent 组件，可编辑表格
const xFormComponent: React.FC<xFormProps> = ({
                                                  dataSource,
                                                  setDataSource,
                                                  setEditableRowKeys,
                                                  extra,
                                                  editableKeys
                                              }) => {
    // 表格列配置
    const columns = ({ columnType, onDelete }: Props): TableColumn[] => {
        return [
            {
                title: 'KEY',
                key: 'key',
                dataIndex: 'key',
            },
            {
                title: 'VALUE',
                key: 'value',
                dataIndex: 'value',
            },
            {
                title: 'DESCRIPTION',
                key: 'description',
                dataIndex: 'description',
            },
            {
                title: 'OPTION',
                valueType: 'option',
            },
        ];
    };

    return (
        <EditableProTable
            columns={columns('prod')}
            rowKey="id"
            value={dataSource}
            onChange={setDataSource}
            recordCreatorProps={{
                newRecordType: 'dataSource',
                record: () => ({
                    id: Date.now(),
                }),
            }}
            editable={{
                type: 'multiple',
                editableKeys,
                actionRender: (row, config, defaultDoms) => {
                    return [defaultDoms.delete];
                },
                onValuesChange: (record, recordList) => {
                    if (extra) {
                        extra(recordList);
                    }
                    setDataSource(recordList);
                },
                onChange: setEditableRowKeys,
            }}
        />
    );
};

export default xFormComponent;
