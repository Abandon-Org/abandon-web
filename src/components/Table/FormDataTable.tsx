import React, { useState } from 'react';
import { Form, Select } from 'antd';
import { EditableProTable } from '@ant-design/pro-table';

const { Option } = Select;

// 定义表格列配置的接口
interface TableColumn {
    key: string;
    dataIndex: string;
    // 可以根据实际情况添加其他属性
}

// 定义表格数据项的接口，新增了 'type' 属性
interface TableDataItem {
    id: number;
    key: string;
    value: string;
    description: string;
    type: string; // 添加 'type' 属性
    // 可以根据实际情况添加其他属性
}

// 定义 FormDataComponent 组件的属性接口
interface FormDataProps {
    dataSource: TableDataItem[];
    setDataSource: (data: TableDataItem[]) => void;
    setEditableRowKeys: (keys: React.Key[]) => void;
    extra?: (recordList: TableDataItem[]) => void;
    editableKeys: React.Key[];
}

// FormDataComponent 可编辑表格组件
const FormDataComponent: React.FC<FormDataProps> = ({
                                                        dataSource,
                                                        setDataSource,
                                                        setEditableRowKeys,
                                                        extra,
                                                        editableKeys,
                                                    }) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<string>('');

    // 表格列配置
    const columns: TableColumn[] = [
        {
            title: 'KEY',
            key: 'key',
            dataIndex: 'key',
        },
        {
            title: 'TYPE',
            key: 'type',
            dataIndex: 'type',
            width: '10%',
            valueType: 'select',
            fieldProps: {
                defaultValue: 'TEXT', // 设置默认值为 'TEXT'
            },
            renderFormItem: (_, { value, onChange }) => (
                <Select value={value} onChange={onChange}>
                    <Option value="TEXT">TEXT</Option>
                    {/*<Option value="FILE">FILE</Option>*/}
                </Select>
            ),
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

    return (
        <EditableProTable
            columns={columns}
            rowKey="id"
            value={dataSource}
            onChange={setDataSource}
            recordCreatorProps={{
                newRecordType: 'dataSource',
                record: () => ({
                    id: Date.now(),
                    type: 'TEXT', // 设置默认类型为 'TEXT'
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

export default FormDataComponent;
