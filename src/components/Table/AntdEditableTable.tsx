import React, { useState } from 'react';
import "./AntdEditableTable.less";
import { Button, Col, message, Divider, Form, Input, Popconfirm, Row, Select, Table, Typography } from 'antd';
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

interface EditableCellProps {
  editing: boolean;
  dataIndex: string;
  title: string;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  record: any;
  index: number;
  key: string;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                     editing,
                                                     dataIndex,
                                                     title,
                                                     type,
                                                     setType,
                                                     record,
                                                     index,
                                                     key,
                                                     children,
                                                     ...restProps
                                                   }) => {
  return (
      <td {...restProps}>
        {editing ? (
            <Form.Item
                name={dataIndex}
                style={{
                  margin: 0,
                }}
                initialValue={record.dataIndex}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]}
            >
              <Input placeholder={`please input ${title}`} />
            </Form.Item>
        ) : (
            children
        )}
      </td>
  );
};

interface AntdEditableTableProps {
  data: Array<{ key: string; type: string; value: string }>;
  setData: React.Dispatch<React.SetStateAction<Array<{ key: string; type: string; value: string }>>>;
  ossFileList: Array<{ file_path: string }>;
}

const AntdEditableTable: React.FC<AntdEditableTableProps> = ({ data, setData, ossFileList }) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string>('');
  const [type, setType] = useState<string>('FILE');
  const [filepath, setFilepath] = useState<string | null>(null);

  const isEditing = (record: { key: string }) => record.key === editingKey;

  const edit = (record: { key: string }) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: string) => {
    try {
      const row = await form.validateFields();
      if (type === 'FILE' && !filepath) {
        message.info("请选择文件");
        return;
      }
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        const exists = newData.findIndex((item) => row.key === item.key);
        if (exists > -1) {
          message.info("该key已存在");
          return;
        }
        newData.splice(index, 1, { ...item, ...row, type, value: filepath });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push({ ...row, type, value: filepath });
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const onDeleteItem = (key: string) => {
    const newData = [...data];
    newData.splice(newData.findIndex((item) => key === item.key), 1);
    setData(newData);
  }

  const columns = [
    {
      title: 'KEY',
      dataIndex: 'key',
      width: "30%",
      editable: true,
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      type: 'select',
      width: "10%",
      render: (_, record: { key: string }) => record.key === editingKey ? (
          <Select style={{ width: '100%' }} value={type} onChange={currentType => {
            setType(currentType)
          }}>
            {/*<Option value="FILE">FILE</Option>*/}
            <Option value="TEXT">TEXT</Option>
          </Select>
      ) : (
          record.type
      ),
    },
    {
      title: 'VALUE',
      dataIndex: 'value',
      width: "40%",
      render: (_, record: {
          value: JSX.Element | any;
          key: string }) => record.key === editingKey ? (
          type === 'FILE2' ? (
              <Select style={{ width: '100%' }} placeholder="please select oss file" showSearch value={filepath}
                      onChange={e => setFilepath(e)}>
                {ossFileList.map(v => <Option key={v.file_path} value={v.file_path}>{v.file_path}</Option>)}
              </Select>
          ) : (
              <Input placeholder="please input VALUE" value={filepath} onChange={e => {
                setFilepath(e.target.value)
              }} />
          )
      ) : (
          type === 'FILE2' ? (
              <a href={`/oss/download?filepath=${record.value}`}>{record.value}</a>
          ) : (
              record.value
          )
      ),
    },
    {
        title: 'DESCRIPTION',
        dataIndex: 'description',
        width: "30%",
        editable: true,
    }
  ];

  const onAdd = () => {
    const newData = [...data, { key: "", type: 'TEXT', value: null }]
    setData(newData)
    setType("TEXT")
  }

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any, index: number) => ({
        record,
        index,
        type,
        setType,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
      <>
        <Row style={{ marginBottom: 12 }}>
          <Col span={6}>
            <Button type="primary" onClick={onAdd} icon={<PlusOutlined />}>Add</Button>
          </Col>
        </Row>
        <Form form={form} component={false}>
          <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
          />
        </Form>
      </>
  );
};

export default AntdEditableTable;
