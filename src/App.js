// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <h1>四级菜单示例</h1>
        <nav>
          <ul>
            <li>
              <Link to="/group-list">事务（群）列表</Link>
              <ul>
                <li>
                  <Link to="/group-list/transaction-list">事务列表</Link>
                  <ul>
                    <li>
                      <Link to="/group-list/transaction-list/role-definition">角色定义</Link>
                      <ul>
                        <li>
                          <Link to="/group-list/transaction-list/role-definition/person-management">人员管理</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/group-list" element={<GroupList />} />
          <Route path="/group-list/transaction-list" element={<TransactionList />} />
          <Route path="/group-list/transaction-list/role-definition" element={<RoleDefinition />} />
          <Route path="/group-list/transaction-list/role-definition/person-management" element={<PersonManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

const GroupList = () => <h2>事务（群）列表</h2>;
const TransactionList = () => <h2>事务列表</h2>;
const RoleDefinition = () => <h2>角色定义</h2>;
const PersonManagement = () => <h2>人员管理</h2>;

export default App;
