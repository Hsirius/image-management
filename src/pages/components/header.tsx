import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Avatar } from "antd";
import { useObserver } from "mobx-react-lite";
import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./index.module.scss";

const Header = withRouter(({ history }) => {
  const userDropDown = (
    <Menu>
      <Menu.Item
        key="logout"
        onClick={() => {
          history.push("/login");
        }}
      >
        <LogoutOutlined />
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  return useObserver(() => (
    <header className={styles.header}>
      <h1>赛博智能影像管理平台</h1>
      <Dropdown overlay={userDropDown}>
        <span className={styles.user}>
          <Avatar size="small" icon={<UserOutlined />} />
          <span>test</span>
        </span>
      </Dropdown>
    </header>
  ));
});
export default Header;
