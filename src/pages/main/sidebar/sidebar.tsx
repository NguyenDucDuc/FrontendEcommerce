import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Col, Input, Menu, MenuProps, Rate, Row } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosClient } from "../../../lib/axios/axios.config";
import { endpoint } from "../../../configs/Api";
import { Response } from "../../../models/http";

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

const desc = ["1", "2", "3", "4", "5"];

const SideBar = () => {
  const [categories, setCategories] = useState([]);
  const [shop, setShop] = useState([]);
  const [inputCurrency, setInputCurrency] = useState({
    fP: 0,
    tP: 0,
  });
  const [value, setValue] = useState(4);
  const nav = useNavigate();
  const location = useLocation();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log({ e });
  };

  const onChangeCurrency = () => {
    if (location.pathname.includes("?")) {
      nav(
        `&fP=${inputCurrency.fP}${
          inputCurrency.tP > 0 ? `&tP=${inputCurrency.tP}` : ""
        }`
      );
    } else {
      nav(
        `?fP=${inputCurrency.fP}${
          inputCurrency.tP > 0 ? `&tP=${inputCurrency.tP}` : ""
        }`
      );
    }
  };
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
          <Row justify={"center"}>
            <Col span={12}>
              <Button onClick={onChangeCurrency}>Áp dụng</Button>
            </Col>
          </Row>
        </>,
        "3"
      ),
      getItem(
        <span>
          <p style={{ color: "black" }}>Đánh giá</p>
          <Rate
            tooltips={desc}
            onChange={(e) => {
              setValue(e);
              if (location.pathname.includes("?")) {
                nav(`&rate=${e}`);
              } else {
                nav(`?rate=${e}`);
              }
            }}
            value={value}
          />
          {value ? (
            <span className="ant-rate-text">{desc[value - 1]}</span>
          ) : (
            ""
          )}
        </span>,
        "4"
      ),
    ]),
  ];

  const fetchData = async () => {
    const res: Response = await axiosClient.get(endpoint.category.getAll);
    setCategories(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
