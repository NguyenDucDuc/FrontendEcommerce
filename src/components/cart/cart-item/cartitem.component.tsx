import { Button, Checkbox, Col, InputNumber, Row } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import Api, { AuthApi, endpoint } from "../../../configs/Api";
import {
  decreaseTotalPrice,
  decreaseTotalPriceTotalProductPayment,
  deleteItemAsyncThunk,
  ICartItem,
  increaseTotalPrice,
  increaseTotalPriceTotalProductPayment,
} from "../../../store/slices/cartitem.slice";
import {
  addItemChecked,
  ICheckedItem,
  removeItemChecked,
  updateQuantityCheckedList,
} from "../../../store/slices/product-checked.slice";
import { RootState, useAppDispatch } from "../../../store/store";
import "./cartitem.style.scss";
import { formatCurrency } from "../../../utils/common";
import { Product, Shop } from "../../../models/models";
import { axiosClient } from "../../../lib/axios/axios.config";
import { useSelector } from "react-redux";

interface IProps {
  quantity?: number;
  product: Product;
}

const CartItem: React.FC<IProps> = ({ product, quantity }) => {
  const {
    id,
    name,
    sku,
    rate,
    price,
    isActive,
    desc,
    image,
    unitInStock,
    unitOnOrder,
    shopId,
    categoryId,
    attributeGroupId,
    createdAt,
    updatedAt,
    attributes,
  } = product;
  const valueCheckBox: ICartItem = {
    id: id,
    image: image,
    desc: desc,
    price: price as number,
    quantity: quantity as number,
    name: name,
    shopId: shopId as number,
  };
  const [shop, setShop] = useState<Shop>();
  const [inputNumber, setInputNumber] = useState<number>(quantity as number);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [check, setCheck] = useState<boolean>();
  const listProductChecked = useSelector((state: RootState) => state.productsChecked.listProductsChecked)
  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked === true) {
      // set check box == true
      setCheck(e.target.checked);
      const totalPrice = (price as number) * inputNumber;
      dispatch(
        increaseTotalPriceTotalProductPayment({ totalPrice: totalPrice })
      );
      const newItemChecked: ICheckedItem = {
        id: id,
        name: name,
        desc: desc,
        quantity: quantity as number,
        price: price as number,
        image: image,
        shopName: shop?.shopName,
        shopId: shopId,
      };
      dispatch(addItemChecked(newItemChecked));
    }

    if (e.target.checked === false) {
      // set state checkbox == false
      setCheck(e.target.checked);
      const totalPrice = (price as number) * inputNumber;
      dispatch(
        decreaseTotalPriceTotalProductPayment({ totalPrice: totalPrice })
      );
      // remove from redux checked item
      const newItemChecked: ICheckedItem = {
        id: id,
        name: name,
        desc: desc,
        quantity: quantity as number,
        price: price as number,
        image: image,
        shopName: shop?.shopName as string,
        shopId: shopId,
      };
      
      dispatch(removeItemChecked(newItemChecked));
    }
  };

  const handleQuantityChange = async (value: number | string | null) => {
    setInputNumber(Number(value));
    // update into checked list product
    dispatch(
      updateQuantityCheckedList({
        productId: id,
        quantity: Number(value),
        shopId: shopId,
      })
    );
    // update to database
    const res = await AuthApi().patch(endpoint.productCart.update, {
      productId: id,
      quantity: value,
    });
    // update UI
  };
  const onStep = (value: number, info: any) => {
    if (info.type === "up" && check === true) {
      dispatch(increaseTotalPrice({ unitPrice: Number(price) }));
    }
    if (info.type === "down" && check === true) {
      dispatch(decreaseTotalPrice({ unitPrice: Number(price) }));
    }
  };

  const handleDeleteCartItem = async () => {
    if (id !== undefined) {
      await dispatch(deleteItemAsyncThunk(id));
    }
  };

  useEffect(() => {
    const getShopInfo = async () => {
      if (shopId !== 0) {
        const res = await axiosClient.get(
          endpoint.shop.getDetail(shopId as number)
        );
        setShop(res.data);
      }
    };
    getShopInfo();
  }, []);
  return (
    <div className="cart-item">
      <Row>
        <Col span={24}>
          <h4 className="cs-pointer" onClick={() => nav(`/shop/${shop?.id}`)}>
            {shop?.shopName}
          </h4>
          <hr color="#e6e6e6"></hr>
        </Col>
      </Row>
      <Row justify="space-between" align="middle">
        <Col span={2} style={{}}>
          <div className="cart-img">
            <LazyLoadImage src={image} />
          </div>
        </Col>
        <Col span={6}>
          <h4 style={{textTransform: 'capitalize'}}>{name}</h4>
        </Col>
        <Col span={3} style={{}}>
          <p className="txt-red txt-bold">{formatCurrency(price as number)}</p>
        </Col>
        <Col span={3} style={{}}>
          <InputNumber
            min={1}
            max={unitInStock}
            defaultValue={1}
            onChange={handleQuantityChange}
            onStep={onStep}
          />
        </Col>
        <Col span={3}>
          <Button
            type="primary"
            className="btn-danger"
            onClick={handleDeleteCartItem}
          >
            Xóa
          </Button>
        </Col>
        <Col span={2}>
          <Checkbox
            value={valueCheckBox}
            onChange={handleCheckboxChange}
          ></Checkbox>
        </Col>
      </Row>
    </div>
  );
};

export default CartItem;
