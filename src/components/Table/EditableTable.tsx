import React, { useEffect } from 'react';
import { EditableProTable } from '@ant-design/pro-table';

// 定义表格列配置的接口
interface TableColumn {
    title: string;
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

// 定义可编辑表格的属性接口
interface EditableTableProps {
    columns: TableColumn[];
    dataSource: TableDataItem[];
    title: string;
    setDataSource: (data: TableDataItem[]) => void;
    editableKeys: React.Key[];
    setEditableRowKeys: (keys: React.Key[]) => void;
    extra?: (recordList: TableDataItem[]) => void;
}

// 可编辑表格组件
const EditableTable: React.FC<EditableTableProps> = ({
                                                         columns,
                                                         dataSource,
                                                         title,
                                                         setDataSource,
                                                         editableKeys,
                                                         setEditableRowKeys,
                                                         extra,
                                                     }) => {
    // 当数据源变化时，更新可编辑行的键值列表
    useEffect(() => {
        setEditableRowKeys(dataSource.map((v) => v.id));
    }, [dataSource]);

    return (
        <EditableProTable
            headerTitle={title}
            columns={columns}
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

export default EditableTable;
