import { AppstoreOutlined, DownOutlined, MailOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Dropdown, Menu, MenuProps, Row, Space, Typography } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { RootState } from "../../store/store";
import Header from "../header/header.component";
import "./main.style.scss"


const MainLayout = () => {
    const user = useSelector((state: RootState) => state.user.user)

    return (
        <div>
            <div className="header">
                <Header />
            </div>
            <Outlet />
        </div>
    )
}

export default MainLayout