import React, { useEffect } from 'react';
import { EditableProTable } from '@ant-design/pro-table';

interface TableColumn {
    title: string;
    key: string;
    dataIndex: string;
    // Add any other properties based on your actual column configuration
}

interface TableDataItem {
    id: number;
    key: string;
    value: string;
    description: string;
    // Add any other properties based on your actual data structure
}

interface EditableTableProps {
    columns: TableColumn[];
    dataSource: TableDataItem[];
    title: string;
    setDataSource: (data: TableDataItem[]) => void;
    editableKeys: React.Key[];
    setEditableRowKeys: (keys: React.Key[]) => void;
    extra?: (recordList: TableDataItem[]) => void;
}

const EditableTable: React.FC<EditableTableProps> = ({
                                                         columns,
                                                         dataSource,
                                                         title,
                                                         setDataSource,
                                                         editableKeys,
                                                         setEditableRowKeys,
                                                         extra,
                                                     }) => {
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
