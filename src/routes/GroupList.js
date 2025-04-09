import React, { useState } from 'react';
import { Table, Button, Form, Input, Select, Row, Col, Modal } from 'antd';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const { Option } = Select;

const GroupList = () => {
  const columns = [
    { title: '科技事务（群）名称', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: '分类', dataIndex: 'category', key: 'category', sorter: (a, b) => a.category.localeCompare(b.category) },
    { title: '负责人', dataIndex: 'leader', key: 'leader', sorter: (a, b) => a.leader.localeCompare(b.leader) },
    { title: '牵头团队', dataIndex: 'team', key: 'team', sorter: (a, b) => a.team.localeCompare(b.team) },
    { title: '状态', dataIndex: 'status', key: 'status', sorter: (a, b) => a.status.localeCompare(b.status) },
    { title: '已启动事务', dataIndex: 'started', key: 'started', sorter: (a, b) => a.started - b.started },
    { title: '待启动事务', dataIndex: 'pending', key: 'pending', sorter: (a, b) => a.pending - b.pending },
    { title: '风险问题跟踪', dataIndex: 'risk', key: 'risk', sorter: (a, b) => a.risk.localeCompare(b.risk) },
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newItemForm] = Form.useForm();

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleSave = () => {
    newItemForm.validateFields().then((values) => {
      const newItem = {
        key: (originalData.length + 1).toString(),
        name: values.name,
        leader: values.leader,
        team: values.team,
        category: values.category,
        status: '未启动',
        started: 0,
        pending: 0,
        risk: '无',
        actions: '查看详情',
      };
      setFilteredData([...filteredData, newItem]);
      setIsModalVisible(false);
      newItemForm.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    newItemForm.resetFields();
  };

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

  const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '数据');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, '筛选结果.xlsx');
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
          <Button type="primary" style={{ marginRight: 8 }} onClick={handleAdd}>新增</Button>
          <Button type="primary" onClick={() => exportToExcel(filteredData)}>导出到Excel</Button>
        <Modal
          title="新增事务（群）"
          visible={isModalVisible}
          onOk={handleSave}
          onCancel={handleCancel}
          okText="保存"
          cancelText="取消"
        >
          <Form form={newItemForm} layout="vertical">
            <Form.Item
              name="name"
              label="名称"
              rules={[{ required: true, message: '请输入名称' }]}
            >
              <Input placeholder="请输入名称" />
            </Form.Item>
            <Form.Item
              name="leader"
              label="负责人"
              rules={[{ required: true, message: '请输入负责人' }]}
            >
              <Input placeholder="请输入负责人" />
            </Form.Item>
            <Form.Item
              name="team"
              label="牵头团队"
              rules={[{ required: true, message: '请输入牵头团队' }]}
            >
              <Input placeholder="请输入牵头团队" />
            </Form.Item>
            <Form.Item
              name="category"
              label="分类"
              rules={[{ required: true, message: '请输入分类' }]}
            >
              <Input placeholder="请输入分类" />
            </Form.Item>
            <Form.Item
              name="overview"
              label="概述"
              rules={[{ required: true, message: '请输入概述' }]}
            >
              <Input.TextArea placeholder="请输入概述" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
        <Table columns={columns} dataSource={filteredData} />
      </div>
  );
};

export default GroupList;
