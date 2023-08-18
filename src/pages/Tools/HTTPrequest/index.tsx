import React, {useState} from 'react';
import {Button, Card, Input, Radio, Row, Select, Tabs, Col, Dropdown, notification, Table, Menu} from 'antd';
import {DeleteTwoTone, DownOutlined} from '@ant-design/icons';
import {PageContainer} from "@ant-design/pro-components";
import EditableTable from "@/components/Table/EditableTable";
import JSONAceEditor from "@/components/CodeEditor/AceEditor/JSONAceEditor";
import {Props} from "@floating-ui/react-dom-interactions";
import FormData from "@/components/Table/FormDataTable";
import XForm from "@/components/Table/xFormTable";
import {httpRequest} from "@/services/request";
import auth from "@/utils/auth";

const {Option} = Select;
const {TabPane} = Tabs;

const STATUS = {
    200: {color: '#67C23A', text: 'OK'},
    401: {color: '#F56C6C', text: 'unauthorized'},
    400: {color: '#F56C6C', text: 'Bad Request'},
};

const Postman: React.FC = () => {
    const [url, setUrl] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [method, setMethod] = useState('GET');
    const [loading, setLoading] = useState(false);
    const [rawType, setRawType] = useState('JSON');
    const [editor, setEditor] = useState(null);
    const [response, setResponse] = useState({
        response_data: undefined,
        response_headers: undefined
    });
    const [body, setBody] = useState(null);

    // 数据定义---------
    // headers数据定义
    const [headers, setHeaders] = useState([]);
    const [headersKeys, setHeadersKeys] = useState(() => headers.map((item) => item.id));
    // params数据定义
    const [paramsData, setParamsData] = useState([]);
    const [editableKeys, setEditableRowKeys] = useState(() => paramsData.map((item) => item.id));
    // formdata数据定义
    const [formData, setFormData] = useState([]);
    const [formDataKeys, setFormDataKeys] = useState(() => formData.map((item) => item.id));
    // xform数据定义
    const [xform, setxForm] = useState([]);
    const [xformKeys, setxFormKeys] = useState(() => formData.map((item) => item.id));

    // 请求方法下拉选择框
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

    // 拆分 URL 并更新 paramsData 和 editableKeys 状态
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
                newParams.push({key, value, id: now + idx + 10, description: ''});
            });
            setParamsData(newParams);
            setEditableRowKeys(keys);
        }
    };

    //response
    const resColumns = [
        {
            title: 'KEY',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'VALUE',
            dataIndex: 'value',
            key: 'value',
        },
    ];

    // 请求事件处理
    const onRequest = async () => {
        if (url === '') {
            notification.error({
                message: '请求Url不能为空',
            });
            return;
        }
        setLoading(true);
        const params = {
            method,
            url,
            body,
            body_type: bodyType,
            headers: getHeaders(),
        };

        try {
            // 如果类型为none，则body为null
            if (bodyType === 'none') {
                params.body = null;
            }
            // 如果类型为raw，则body为json
            if (bodyType === 'raw') {
                params.body = JSON.parse(body);
            }
            // 如果类型为form-data，则body为formdata，类型为[{},{}]
            if (bodyType === 'form-data') {
                params.body = formData;
            }
            // 如果类型为xform，则body为xform，类型为[{},{}]
            if (bodyType === 'x-www-form-urlencoded') {
                params.body = xform;
            }
            // 发送异步请求
            const res = await httpRequest(params);
            setLoading(false);

            if (auth.response(res, true)) {
                setResponse(res.data);
            }
        } catch (error) {
            notification.error({
                message: '请求发生异常，请检查输入值是否符合要求。',
            });
        }
    };

    const getHeaders = () => {
        const result = {};
        headers.forEach((item) => {
            if (item.key !== '') {
                result[item.key] = item.value;
            }
        });
        return result;
    };


    // 拼接 URL
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


    const columns = ({columnType, onDelete}: Props): Column[] => {
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
                render: (text: string, record: []) => {
                    return (
                        <>
                            <DeleteTwoTone
                                style={{cursor: 'pointer', marginLeft: 8}}
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

    interface ResponseData {
        response_data?: {
            status_code: string;
            elapsed_time: string;
            // Other response properties
        };
        // Other response properties
    }

    interface StatusItem {
        color: string;
        text: string;
        // Other status properties
    }

    interface StatusMap {
        [key: string]: StatusItem;
    }

    interface TabExtraProps {
        response: ResponseData | undefined;
    }

    const STATUS: StatusMap = {
        // Define your STATUS mapping here
        // Example:
        '200': {color: '#67C23A', text: 'OK'},
        '400': {color: 'red', text: 'Bad Request'},
        // Add more status codes
    };

    // TabExtra函数，根据响应数据显示状态和时间
    const tabExtra = (response: Response | null): JSX.Element | null => {
        return response && response.response_data ? (
            <div style={{ marginRight: 16 }}>
            <span>
                Status:
                <span
                    style={{
                        color: STATUS[response.status_code]?.color || '#67C23A',
                        marginLeft: 8,
                        marginRight: 8,
                    }}
                >
                    {response.status_code}{' '}
                    {STATUS[response.status_code]?.text || ''}
                </span>
                <span style={{ marginLeft: 8, marginRight: 8 }}>
                    Time: <span style={{ color: '#67C23A' }}>{response.elapsed_time}</span>
                </span>
            </span>
            </div>
        ) : null;
    };

    // 点击下拉菜单项时更新 Raw Type
    const onClickMenu = (key: string) => {
        setRawType(key);
    };

    // 根据响应字段生成数据表格
    const toTable = (field: string) => {
        if (!response[field]) {
            return [];
        }
        const temp = JSON.parse(response[field]);
        return Object.keys(temp).map((key) => ({
            key,
            value: temp[key],
        }));
    };

    // 根据 Body 类型生成不同的显示内容
    const getBody = bd => {
        if (bd === 'none') {
            return <div style={{height: '20vh', lineHeight: '20vh', textAlign: 'center'}}>
                This request does not have a body
            </div>
        }
        if (bd === 'form-data') {
            return <FormData
                columns={columns('FormData')}
                dataSource={formData}
                setDataSource={setFormData}
                editableKeys={formDataKeys}
                setEditableRowKeys={setFormDataKeys}>
            </FormData>
        }
        if (bd === 'binary') {
            return <div style={{height: '20vh', lineHeight: '20vh', textAlign: 'center'}}>
                binary占位！，先给常用功能做出
            </div>
        }
        if (bd === 'GraphQL') {
            return <div style={{height: '20vh', lineHeight: '20vh', textAlign: 'center'}}>
                GraphQL占位！，先给常用功能做出
            </div>
        }
        if (bd === 'x-www-form-urlencoded') {
            return <XForm
                columns={columns('XForm')}
                dataSource={xform}
                setDataSource={setxForm}
                editableKeys={xformKeys}
                setEditableRowKeys={setxFormKeys}>
            </XForm>
        }
        return <Row style={{marginTop: 12}}>
            <Col span={24}>
                <Card bodyStyle={{padding: 0}}>
                    <JSONAceEditor value={body} onChange={e => setBody(e)} height="20vh" setEditor={setEditor}/>
                </Card>
            </Col>
        </Row>
    }


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
                            Save{' '}
                        </Button>
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
                                setEditableRowKeys={setEditableRowKeys}>
                            </EditableTable>
                        </TabPane>
                        <TabPane tab="Headers" key="2">
                            <EditableTable
                                columns={columns('headers')}
                                title="Headers"
                                dataSource={headers}
                                setDataSource={setHeaders}
                                editableKeys={headersKeys}
                                setEditableRowKeys={setHeadersKeys}>
                            </EditableTable>
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
                                {/*如果 bodyType 等于 1，则会渲染一个下拉菜单，菜单内有一个链接，显示 rawType 的值和一个向下的箭头图标。
                                当用户点击链接时，会显示下拉菜单的内容，而不会触发页面跳转。*/}
                                {bodyType === 'raw' ? (
                                    <Dropdown style={{marginLeft: 8}} overlay={menu} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            {rawType} <DownOutlined/>
                                        </a>
                                    </Dropdown>
                                ) : null}
                            </Row>
                            {getBody(bodyType)}
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
                                    language={response.response_data && response.response_headers.indexOf("json") > -1 ? 'json' : 'text'}
                                    value={response.response_data && typeof response.response_data === 'object' ? JSON.stringify(response.response_data, null, 2) : response.response_data || ''}
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
