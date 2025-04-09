// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GroupList from './routes/GroupList';
import TransactionList from './routes/TransactionList';
import RoleDefinition from './routes/RoleDefinition';
import PersonManagement from './routes/PersonManagement';

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


export default App;
