import React, { useEffect, useState } from 'react';
import { PageContainer } from "@ant-design/pro-components";
import { Button, Card, Col, Divider, Form, Input, Modal, Row, Select, Switch, Table, Tag } from "antd";
import UserLink from "@/components/Button/UserLink";
import CONFIG from "@/consts/config";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "dva";
import AbandonPopConfirm from "@/components/Confirm/AbandonPopConfirm";
import UserModel from "@/models/auth/user";

const { Option } = Select;

const UserInfo: React.FC<UserModel> = ({user, dispatch }) => {
    const [modal, setModal] = useState<boolean>(false);
    const [record, setRecord] = useState<any>({});
    const [form] = Form.useForm();
    const [createUserModalVisible, setCreateUserModalVisible] = useState<boolean>(false);
    const [createForm] = Form.useForm();    


    const onSwitch = (value: boolean, id: number) => {
        dispatch({
            type: 'user/updateUser',
            payload: {
                id,
                is_valid: value,
            },
        });
    };

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: <span><UserOutlined /> 姓名</span>,
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <UserLink marginLeft={4} user={record} />,
        },
        {
            title: '✉ 邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '🎨 角色',
            dataIndex: 'role',
            key: 'role',
            render: (role: number) => <Tag color={CONFIG.USER_ROLE_TAG[role]}>{CONFIG.USER_ROLE[role]}</Tag>,
        },
        {
            title: '上次登录',
            dataIndex: 'last_login_at',
            key: 'last_login_at',
        },
        {
            title: '🚫 是否启用',
            dataIndex: 'is_valid',
            key: 'is_valid',
            render: (is_valid: boolean, record: any) => <Switch defaultChecked={is_valid} onChange={(e) => {
                onSwitch(e, record.id);
            }} />,
        },
        {
            title: '🧷 操作',
            key: 'ops',
            render: (_, record: any) => (
                <>
                    <a onClick={() => {
                        setRecord(record);
                        form.setFieldsValue(record);
                        setModal(true);
                    }}>编辑</a>
                    <Divider type="vertical" />
                    <AbandonPopConfirm onConfirm={async () => {
                        // await onDeleteUser(record.id);
                    }} text="删除" title="你确定要删除该用户吗?" />
                </>
            ),
        },
    ];



    const fetchUserInfo = async () => {
        try {
            // 使用 await 等待异步操作完成
            await dispatch({
                type: 'user/fetchUserList',
            });
        } catch (error) {
            // 处理错误
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
        console.info(currentUserList);
        console.info(user)
    }, []);


    const { currentUserList } = user; // 从 user 属性中获取 currentUserList

    return (
        <PageContainer breadcrumb={null} title="用户管理页面">
            <Card>
                <Modal title="编辑用户" width={500} visible={modal} onCancel={() => setModal(false)}>
                    <Form form={form} initialValues={record} {...CONFIG.LAYOUT}>
                        <Form.Item label="姓名" name="name">
                            <Input placeholder="输入用户姓名" />
                        </Form.Item>
                        <Form.Item label="邮箱" name="email">
                            <Input placeholder="输入用户邮箱" />
                        </Form.Item>
                        <Form.Item label="角色" name="role">
                            <Select>
                                <Option key={0} value={0}>普通成员</Option>
                                <Option key={1} value={1}>组长</Option>
                                <Option key={2} value={2}>超级管理员</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="创建新用户"
                    visible={createUserModalVisible}
                    onCancel={() => setCreateUserModalVisible(false)}
                    // onOk={handleCreateUser}
                >
                    <Form form={createForm} layout="vertical">
                        <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="密码" name="passwd" rules={[{ required: true, message: '请输入密码' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="角色" name="role" rules={[{ required: true, message: '请选择角色' }]}>
                            <Select>
                                <Option value={0}>普通成员</Option>
                                <Option value={1}>组长</Option>
                                <Option value={2}>超级管理员</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
                <Row style={{ marginBottom: 12 }}>
                    <Col span={4}>
                        <Button type="primary" onClick={() => setCreateUserModalVisible(true)}>创建用户</Button>
                    </Col>
                    <Col span={6}>
                        <Input.Search placeholder="输入用户邮箱或姓名" onChange={(e) => {
                            // onSearch(e.target.value);
                        }} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table columns={columns} dataSource={currentUserList}/>
                    </Col>
                </Row>
            </Card>
        </PageContainer>
    );
};

export default connect(({ user }, dispatch) => ({user, dispatch}))(UserInfo);
