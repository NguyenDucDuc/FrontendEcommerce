import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";

import "./add-product.style.scss";
import { axiosClient } from "../../lib/axios/axios.config";
import { ENDPOINT } from "../../constants/api";
import { generateOptions } from "../../utils/generateOptions";
import { Attribute } from "../../models/models";
import { Response } from "../../models/http";

const AddProduct: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [initValue, setInitValue] = useState({
    attributeGroup: [],
    categories: [],
  });
  const [image, setImage] = useState<any>();
  const [attributeList, setAttributeList] = useState<any>({});

  const [form] = Form.useForm();

  const fetchInitValue = async () => {
    const attributeGroup = axiosClient.get(`${ENDPOINT.ATTRIBUTE_GROUP}`);
    const categories = axiosClient.get(`${ENDPOINT.CATEGORY}`);

    Promise.all([attributeGroup, categories]).then(
      ([attributeGroup, categories]) => {
        setInitValue({
          attributeGroup: attributeGroup.data,
          categories: categories.data,
        });
      }
    );
  };

  const changeAttributeGroup = async (option: number) => {
    const attributeList = await axiosClient.get(
      `${ENDPOINT.ATTRIBUTE}/${option}`
    );
    setAttributeList(
      attributeList.data.reduce((obj: any, item: any) => {
        obj[item.id] = item;
        return obj;
      }, {})
    );
  };

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImage(e.target.files[0]);
    }
  };

  const generateInput = (attribute: any, key: any) => {
    return (
      <Col span={24}>
        <Form.Item
          key={key}
          label={attribute.name}
          name={["attributes", `${attribute.id}`]}
        >
          <Input type={attribute?.frontendInput} />
        </Form.Item>
      </Col>
    );
  };

  const onFinish = async (values: any) => {
    const attributes = Object.keys(values.attributes).reduce(
      (obj: any, attributeId: any) => {
        const attribute: Attribute = {
          value: values.attributes[attributeId],
          attributeId: attributeId,
          name: attributeList[attributeId]["name"],
          backendType: attributeList[attributeId]["backendType"],
          frontendInput: attributeList[attributeId]["frontendInput"],
        };
        obj.ids.push(parseInt(attributeId));
        obj.list.push(attribute);
        return obj;
      },
      { ids: [], list: [] }
    );
    values.image = image;
    values.ids = JSON.stringify(attributes.ids);
    values.list = JSON.stringify(attributes.list);

    const { attributes: attributeIgnore, ...dataToServer } = values;
    try {
      const res: Response = await axiosClient.post(
        ENDPOINT.ADD_PRODUCT,
        dataToServer,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 201) {
        message.success(res.message);
        form.resetFields();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Đã có lỗi xảy ra !!");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("Đã có lỗi xảy ra !!");
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    fetchInitValue();
  }, []);

  const attributeGroupOptions = generateOptions(initValue.attributeGroup);
  const categoryOptions = generateOptions(initValue.categories);

  return (
    <section className="product-container">
      <h1 className="text-center">Thông tin sản phẩm</h1>
      <Row justify="center">
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          disabled={componentDisabled}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: "50%" }}
        >
          <Col span={24}>
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trường này",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Giá sản phẩm"
              name="price"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trường này",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Số lượng"
              name="unitInStock"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trường này",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Ngành hàng"
              name="categoryId"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trường này",
                },
              ]}
            >
              <Select options={categoryOptions}></Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Mô tả sản phẩm"
              name="desc"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trường này",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Ảnh sản phẩm"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Vui lòng thêm ảnh cho sản phẩm",
                },
              ]}
            >
              <Input type="file" onChange={(e) => imageChange(e)} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Loại sản phẩm"
              name="attributeGroupId"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trường này",
                },
              ]}
            >
              <Select
                onChange={(option) => changeAttributeGroup(option)}
                options={attributeGroupOptions}
              ></Select>
            </Form.Item>
          </Col>
          {Object.values(attributeList).map((item: any, key) =>
            generateInput(item, key)
          )}
          <Col span={24}>
            <Form.Item style={{ textAlign: "center", width: "100%" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Form>
      </Row>
    </section>
  );
};

export default AddProduct;
