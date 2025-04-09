// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import GroupList from './routes/GroupList';
import TransactionList from './routes/TransactionList';
import RoleDefinition from './routes/RoleDefinition';
import PersonManagement from './routes/PersonManagement';

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Sider style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            selectedKeys={[window.location.pathname]}
            style={{ color: '#000' }}
            defaultOpenKeys={['/group-list/transaction-list']}
          >
            <Menu.Item key="/group-list" icon={<img src="/image/group-list.svg" alt="事务（群）列表" style={{ width: 20, verticalAlign: 'middle', marginRight: 8 }} />}>
              <Link to="/group-list">事务（群）列表</Link>
            </Menu.Item>
            <Menu.SubMenu
              key="/group-list/transaction-list"
              title={
                <span>
                  <img src="/image/transaction-list.svg" alt="事务列表" style={{ width: 20, verticalAlign: 'middle', marginRight: 8 }} />
                  事务列表
                </span>
              }
            >
              <Menu.Item key="/group-list/transaction-list/role-definition" icon={<img src="/image/role-definition.svg" alt="角色定义" style={{ width: 20, verticalAlign: 'middle', marginRight: 8 }} />}>
                <Link to="/group-list/transaction-list/role-definition">角色定义</Link>
              </Menu.Item>
              <Menu.Item key="/group-list/transaction-list/role-definition/person-management" icon={<img src="/image/person-management.svg" alt="人员管理" style={{ width: 20, verticalAlign: 'middle', marginRight: 8 }} />}>
                <Link to="/group-list/transaction-list/role-definition/person-management">人员管理</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Layout.Sider>
        <Layout.Content style={{ padding: '16px' }}>
          <Routes>
            <Route path="/group-list" element={<GroupList />} />
            <Route path="/group-list/transaction-list" element={<TransactionList />} />
            <Route path="/group-list/transaction-list/role-definition" element={<RoleDefinition />} />
            <Route path="/group-list/transaction-list/role-definition/person-management" element={<PersonManagement />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </Router>
  );
};


export default App;
