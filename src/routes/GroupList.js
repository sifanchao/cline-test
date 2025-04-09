import React from 'react';
import { Table } from 'antd';

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

  const data = [
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

  return <Table columns={columns} dataSource={data} />;
};

export default GroupList;
