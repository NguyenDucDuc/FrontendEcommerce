import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Menu, MenuProps, Rate, Row, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosClient } from "../../../lib/axios/axios.config";
import { endpoint } from "../../../configs/Api";
import { Response } from "../../../models/http";
import { generateShopOptions } from "../../../utils/generateOptions";
import { useForm } from "antd/es/form/Form";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const SideBar = () => {
  const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState<any[]>([]);
  const [inputCurrency, setInputCurrency] = useState({
    fP: 0,
    tP: 0,
  });
  const nav = useNavigate();
  const location = useLocation();
const [formShop] = useForm()
  const onClick: MenuProps["onClick"] = (e) => {
    console.log({ e });
  };
  
  const fetchShop = async () => {
    const shops = await axiosClient.get(`${endpoint.shop.getAll}/get-all`);
    console.log({ shops });

    setShops([{ value: null, label: "" }, ...generateShopOptions(shops.data)]);
  };

  const onChangeCurrency = () => {
    const shopId = formShop.getFieldValue('shopId')
    if (location.pathname.includes("?")) {
      nav(
        `&fP=${inputCurrency.fP}${
          inputCurrency.tP > 0 ? `&tP=${inputCurrency.tP}` : ""
        }${shopId ? `&shopId=${shopId}` : ''}`
      );
    } else {
      nav(
        `?fP=${inputCurrency.fP}${
          inputCurrency.tP > 0 ? `&tP=${inputCurrency.tP}` : ""
        }${shopId ? `&shopId=${shopId}` : ''}`
      );
    }
  };
  

  const fetchData = async () => {
    const res: Response = await axiosClient.get(endpoint.category.getAll);
    setCategories(res.data);
  };

  useEffect(() => {
    fetchData();
    fetchShop();
  }, []);

  const onReset = () => {
    nav(location.pathname)    
    setInputCurrency({
      fP: 0,
      tP: 0,
    })
    formShop.setFieldValue('shopId', null)
  }

  const items: MenuProps["items"] = [
    getItem("Quản lý danh mục", "categories", <MailOutlined />, [
      getItem(
        <Link style={{ textTransform: "capitalize" }} to={`/categories/1`}>
          Tất cả
        </Link>,
        0
      ),
      ...categories.map((item: any) => {
        return getItem(
          <Link
            style={{ textTransform: "capitalize" }}
            to={`/categories/${item.id}`}
          >
            {item.name}
          </Link>,
          item.id
        );
      }),
    ]),

    getItem("Bộ lọc tìm kiếm", "filter", <AppstoreOutlined />, [
      getItem(
        <>
          <Row>
            <Col span={24}>Chọn khoảng giá</Col>
          </Row>
          <Row justify={"space-between"}>
            <Col span={11}>
              <Input
                value={inputCurrency.fP}
                name={"fP"}
                onChange={(e) => {
                  setInputCurrency((pre) => {
                    return { ...pre, fP: Number(e.target.value) };
                  });
                }}
              />
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              -
            </Col>
            <Col span={11}>
              <Input
                value={inputCurrency.tP}
                name="tP"
                onChange={(e) => {
                  setInputCurrency((pre) => {
                    return { ...pre, tP: Number(e.target.value) };
                  });
                }}
              />
            </Col>
          </Row>
        </>,
        "3"
      ),
      getItem(
        <span>
          <Row>
          <Col span={24}>Cửa hàng</Col>
          <Col span={24}>
            <Form form={formShop}>

              <Form.Item name="shopId">
                <Select options={shops} style={{ width: "100%" }}/>
              </Form.Item>
            </Form>
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col span={12}>
              <Button onClick={onChangeCurrency}>Áp dụng</Button>
            </Col>
            <Col span={12}>
              <Button onClick={onReset}>Đặt lại</Button>
            </Col>
          </Row>
        </span>,
        "4"
      ),
    ]),
  ];

  return (
    <section className="sidebar__container">
      {categories && (
        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
          theme="light"
        />
      )}
    </section>
  );
};

export default SideBar;
