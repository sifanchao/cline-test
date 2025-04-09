import React, { useState } from 'react';
import { Table, Button, Form, Input, Select, Row, Col } from 'antd';

const { Option } = Select;

const GroupList = () => {
  const columns = [
    { title: '科技事务（群）名称', dataIndex: 'name', key: 'name' },
    { title: '分类', dataIndex: 'category', key: 'category' },
    { title: '负责人', dataIndex: 'leader', key: 'leader' },
    { title: '牵头团队', dataIndex: 'team', key: 'team' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '已启动事务', dataIndex: 'started', key: 'started' },
    { title: '待启动事务', dataIndex: 'pending', key: 'pending' },
    { title: '风险问题跟踪', dataIndex: 'risk', key: 'risk' },
    { title: '操作信息', dataIndex: 'actions', key: 'actions' },
  ];

  const originalData = [
    {
      key: '1',
      name: '事务群A',
      category: '分类1',
      leader: '张三',
      team: '团队A',
      status: '进行中',
      started: 5,
      pending: 3,
      risk: '无',
      actions: '查看详情',
    },
    {
      key: '2',
      name: '事务群B',
      category: '分类2',
      leader: '李四',
      team: '团队B',
      status: '已完成',
      started: 8,
      pending: 0,
      risk: '低',
      actions: '查看详情',
    },
  ];
  const [filteredData, setFilteredData] = useState(originalData);

  const [form] = Form.useForm();

  const handleSearch = (values) => {
    if (Object.keys(values).length === 0) {
      setFilteredData(originalData);
      return;
    }
    const filtered = originalData.filter((item) => {
      return (
        (!values.year || item.name.includes(values.year)) &&
        (!values.category || item.category.includes(values.category)) &&
        (!values.name || item.name.includes(values.name)) &&
        (!values.leader || item.leader.includes(values.leader)) &&
        (!values.status || item.status === values.status)
      );
    });
    setFilteredData(filtered);
  };

  return (
      <div>
        <Form layout="inline" form={form} onFinish={handleSearch} style={{ marginBottom: 16 }}>
          <Row gutter={[0, 12]}>
            <Col span={8}>
              <Form.Item name="year" label="年份" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <Input placeholder="请输入年份" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label="分类" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <Input placeholder="请输入分类" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="leader" label="负责人" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <Input placeholder="请输入负责人" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="事务（群）名称" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <Input placeholder="请输入名称" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="status" label="状态" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <Select placeholder="请选择状态" style={{ width: '100%' }} allowClear>
                  <Option value="进行中">进行中</Option>
                  <Option value="已完成">已完成</Option>
                  <Option value="未启动">未启动</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Button type="primary" htmlType="submit">查询</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary">新增</Button>
      </div>
        <Table columns={columns} dataSource={filteredData} />
    </div>
  );
};

export default GroupList;
