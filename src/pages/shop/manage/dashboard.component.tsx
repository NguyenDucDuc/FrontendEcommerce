import React, { useEffect } from "react";
import "./dashboard.style.scss";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosClient } from "../../../lib/axios/axios.config";
import { endpoint } from "../../../configs/Api";
import { Col, Row, message } from "antd";
import { Response } from "../../../models/http";
import SideBar from "./sidebar/sidebar.component";

const DashBoardShop = () => {
  const { shopId } = useParams();
  const currentUser = useSelector((state: any) => state.user.user);
  const navigate = useNavigate()

  const getUserIdByShopId = async (shopId: number) => {
    try {
      const res: Response = await axiosClient.get(
        endpoint.shop.getUserByShopID(shopId)
      );
      
      if (currentUser.id !== 88 && res.data !== currentUser.id) {
        navigate('/')
        message.warning('Bạn không có quyền truy cập')
      }
    } catch (error) {
      console.log(error);
      message.error("Đã có lỗi xảy ra !!");
    }
  };

  useEffect(() => {
    getUserIdByShopId(Number(shopId));
  }, [currentUser.id, shopId]);

  return (
    <>
      <section>
        <Row>
          <Col span={4}>
            <SideBar />
          </Col>
          <Col span={20}>
            <Outlet />
          </Col>
        </Row>
      </section>
    </>
  );
};

export default DashBoardShop;
