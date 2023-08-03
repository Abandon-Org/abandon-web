import React, {useState} from 'react';
import {Button, Card, Input, Radio, Row, Select, Tabs, Col, Dropdown, notification, Table, Menu} from 'antd';
import {DeleteTwoTone, DownOutlined, EditTwoTone} from '@ant-design/icons';
import {PageContainer} from "@ant-design/pro-components";
import EditableTable from "@/components/Table/EditableTable";
import JSONAceEditor from "@/components/CodeEditor/AceEditor/JSONAceEditor";
import {Props} from "@floating-ui/react-dom-interactions";
import {list} from "postcss";

const {Option} = Select;
const {TabPane} = Tabs;

const Postman: React.FC = () => {
    const [url, setUrl] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [method, setMethod] = useState('GET');
    const [loading, setLoading] = useState(false);
    const [paramsData, setParamsData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [headersKeys, setHeadersKeys] = useState(() => headers.map((item) => item.id));
    const [editableKeys, setEditableRowKeys] = useState(() => paramsData.map((item) => item.id));
    const [rawType, setRawType] = useState('JSON');
    const [editor, setEditor] = useState(null);
    const [response, setResponse] = useState({});
    const selectBefore = (
        <Select
            value={method}
            onChange={(data) => setMethod(data)}
            style={{width: 120, fontSize: 16, textAlign: 'left'}}
        >
            <Option key="GET" value="GET">GET</Option>
            <Option key="POST" value="POST">POST</Option>
            {/*<Option key="PUT" value="PUT">PUT</Option>*/}
            {/*<Option key="DELETE" value="DELETE">DELETE</Option>*/}
        </Select>
    );

    const splitUrl = (nowUrl: string) => {
        const split = nowUrl.split('?');
        if (split.length < 2) {
            setParamsData([]);
        } else {
            const params = split[1].split('&');
            const newParams: { key: string; value: string; id: number; description: string }[] = [];
            const keys: number[] = [];
            params.forEach((item, idx) => {
                const [key, value] = item.split('=');
                const now = Date.now();
                keys.push(now + idx + 10);
                newParams.push({ key, value, id: now + idx + 10, description: '' });
            });
            setParamsData(newParams);
            setEditableRowKeys(keys);
        }
    };

    const onRequest = async () => {
        if (url === '') {
            notification.error({
                message: '请求Url不能为空',
            });
            return;
        }
    };

    const joinUrl = (data: []) => {
        let tempUrl = url.split('?')[0];
        data.forEach((item, idx) => {
            if (item.key) {
                // 如果item.key有效
                if (idx === 0) {
                    tempUrl = `${tempUrl}?${item.key}=${item.value || ''}`;
                } else {
                    tempUrl = `${tempUrl}&${item.key}=${item.value || ''}`;
                }
            }
        });
        setUrl(tempUrl);
    };


    const columns = ({ columnType, setEditableRowKeys, onDelete }: Props): Column[] => {
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
                title: '操作',
                valueType: 'option',
                render: (text: string, record: []) => {
                    return (
                        <>
                            <EditTwoTone
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setEditableRowKeys([record.id]);
                                }}
                            />
                            <DeleteTwoTone
                                style={{ cursor: 'pointer', marginLeft: 8 }}
                                onClick={() => {
                                    onDelete(columnType, record.id);
                                }}
                                twoToneColor="#eb2f96"
                            />
                        </>
                    );
                },
            },
        ];
    };

    const tabExtra = (response: ResponseData): React.ReactNode | null => {
        return response && response.response ? (
            <div style={{ marginRight: 16 }}>
      <span>
        Status:
        <span
            style={{
                color: STATUS[response.response.status_code]
                    ? STATUS[response.response.status_code].color
                    : '#F56C6C',
                marginLeft: 8,
                marginRight: 8,
            }}
        >
          {response.response.status_code}{' '}
            {STATUS[response.response.status_code]
                ? STATUS[response.response.status_code].text
                : ''}
        </span>
        <span style={{ marginLeft: 8, marginRight: 8 }}>
          Time: <span style={{ color: '#67C23A' }}>{response.response.cost}</span>
        </span>
      </span>
            </div>
        ) : null;
    };

    const onClickMenu = (key: string) => {
        setRawType(key);
    };

    const menu = (
        <Menu>
            <Menu.Item key="Text">
                <a onClick={() => onClickMenu('Text')}>Text</a>
            </Menu.Item>
            <Menu.Item key="JavaScript">
                <a onClick={() => onClickMenu('JavaScript')}>JavaScript</a>
            </Menu.Item>
            <Menu.Item key="JSON">
                <a onClick={() => onClickMenu('JSON')}>JSON</a>
            </Menu.Item>
            <Menu.Item key="HTML">
                <a onClick={() => onClickMenu('HTML')}>HTML</a>
            </Menu.Item>
            <Menu.Item key="XML">
                <a onClick={() => onClickMenu('XML')}>XML</a>
            </Menu.Item>
        </Menu>
    );





        // Add other event handlers here...
    return (
        <PageContainer title="在线HTTP测试工具">
            <Card>
                <Row gutter={[8, 8]}>
                    <Col span={18}>
                        <Input
                            size="large"
                            value={url}
                            addonBefore={selectBefore}
                            placeholder="请输入要请求的url"
                            onChange={(e) => {
                                setUrl(e.target.value);
                                splitUrl(e.target.value);
                            }}
                        />
                    </Col>
                    <Col span={6}>
                        <Button
                            onClick={onRequest}
                            loading={loading}
                            type="primary"
                            size="large"
                            style={{marginRight: 16, float: 'right'}}
                        >
                            Send{' '}
                        </Button>
                    </Col>
                </Row>
                <Row style={{marginTop: 8}}>
                    <Tabs defaultActiveKey="1" style={{width: '100%'}}>
                        <TabPane tab="Params" key="1">
                            <EditableTable
                                columns={columns('params')}
                                title="Query Params"
                                dataSource={paramsData}
                                setDataSource={setParamsData}
                                extra={joinUrl}
                                editableKeys={editableKeys}
                                setEditableRowKeys={setEditableRowKeys}
                            />
                        </TabPane>
                        <TabPane tab="Headers" key="2">
                            <EditableTable
                                columns={columns('headers')}
                                title="Headers"
                                dataSource={headers}
                                setDataSource={setHeaders}
                                editableKeys={headersKeys}
                                setEditableRowKeys={setHeadersKeys}
                            />
                        </TabPane>
                        <TabPane tab="Body" key="3">
                            <Row>
                                <Radio.Group
                                    defaultValue={'none'}
                                    value={bodyType}
                                    onChange={(e) => {
                                        setBodyType(e.target.value)
                                    }}
                                >
                                    <Radio value={'none'}>none</Radio>
                                    <Radio value={'form-data'}>form-data</Radio>
                                    <Radio value={'x-www-form-urlencoded'}>x-www-form-urlencoded</Radio>
                                    <Radio value={'raw'}>raw</Radio>
                                    <Radio value={'binary'}>binary</Radio>
                                    <Radio value={'GraphQL'}>GraphQL</Radio>
                                </Radio.Group>
                                {bodyType === 'raw' ? (
                                    <Dropdown style={{marginLeft: 8}} overlay={menu} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            {rawType} <DownOutlined/>
                                        </a>
                                    </Dropdown>
                                ) : null}
                            </Row>
                        </TabPane>
                    </Tabs>
                </Row>
                <Row gutter={[8, 8]}>
                    {Object.keys(response).length === 0 ? null : (
                        <Tabs style={{width: '100%'}} tabBarExtraContent={tabExtra(response)}>
                            <TabPane tab="Body" key="1">
                                <JSONAceEditor
                                    readOnly={true}
                                    setEditor={setEditor}
                                    language={response.response && response.response_headers.indexOf("json") > -1 ? 'json' : 'text'}
                                    value={response.response && typeof response.response === 'object' ? JSON.stringify(response.response, null, 2) : response.response || ''}
                                    height="30vh"
                                />
                            </TabPane>
                            <TabPane tab="Cookie" key="2">
                                <Table
                                    columns={resColumns}
                                    dataSource={toTable('cookies')}
                                    size="small"
                                    pagination={false}
                                />
                            </TabPane>
                            <TabPane tab="Headers" key="3">
                                <Table
                                    columns={resColumns}
                                    dataSource={toTable('response_headers')}
                                    size="small"
                                    pagination={false}
                                />
                            </TabPane>
                        </Tabs>
                    )}
                </Row>
            </Card>
        </PageContainer>
    );
};

export default Postman;
