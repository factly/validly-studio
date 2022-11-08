import React from 'react';
import { Menu, notification } from 'antd';
import {
  LogoutOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const AccountMenu = () => {
  const handleLogout = () => {
    fetch(window.REACT_APP_KRATOS_PUBLIC_URL + '/self-service/logout/browser', {
      credentials: 'include',
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((res) => {
        window.location.href = res.logout_url;
        localStorage.removeItem('returnTo');
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Unable to logout',
        });
      });
  };
  return (
    <Menu mode="horizontal">
      <Menu.SubMenu key="submenu" title={<UserOutlined style={{ fontSize: '125%' }} />}>
        <Menu.Item key="password">
          <Link to="#">
            <SafetyCertificateOutlined /> Security
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link to="#">
            <EditOutlined /> Profile
          </Link>
        </Menu.Item>
        <Menu.Item key="logout" onClick={handleLogout}>
          <LogoutOutlined />
          Logout
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default AccountMenu;
