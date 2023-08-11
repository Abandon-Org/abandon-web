import React from 'react';
import { Col, Input, Row, Select } from "antd";
import AntdEditableTable from "@/components/Table/AntdEditableTable";

const { Option } = Select;

interface FormDataProps {
  ossFileList: Array<{ key: string }>;
  dataSource: Array<{ key: string; value: string }>;
  setDataSource: React.Dispatch<React.SetStateAction<Array<{ key: string; value: string }>>>;
}

const FormDataComponent: React.FC<FormDataProps> = ({ ossFileList, dataSource, setDataSource }) => {
  const columns = [
    {
      title: 'KEY',
      dataIndex: 'key',
      render: () => <Input />
    },
    {
      title: 'VALUE',
      dataIndex: 'value',
      render: () => (
          <Select>
            {ossFileList.map(v => <Option key={v.key} value={v.key}>{v.key}</Option>)}
          </Select>
      )
    }
  ];

  return (
      <Row gutter={8} style={{ marginTop: 16 }}>
        <Col span={24}>
          <AntdEditableTable bordered={true} columns={columns} data={dataSource} setData={setDataSource} ossFileList={ossFileList} />
        </Col>
      </Row>
  );
};

export default FormDataComponent;
