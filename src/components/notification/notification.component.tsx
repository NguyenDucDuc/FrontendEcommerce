import { Col, Row } from 'antd';
import CardNotification from './card-notification/cardnotification.component';
import './notification.style.scss';
import { authAxios, axiosClient } from '../../lib/axios/axios.config';
import { endpoint } from '../../configs/Api';
import { useEffect, useState } from 'react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

const Notification = () => {
  const [notification, setNotification] = useState([]);
  const user = useSelector((state: RootState) => state.user.user);
  const [shop, setShop] = useState<any[]>([]);

  const getShopByUserId = async () => {
    const res = await axiosClient.get(
      endpoint.shop.getShopByUserID(user.id as number)
    );
    if (res.status === 200) {
      setShop(res.data);
    }
  };

  useEffect(() => {
    getShopByUserId();
    loadNotification();
  }, []);

  const loadNotification = async () => {
    try {
      const res = await authAxios().get(endpoint.notification.base);

      if (res.status === 200) {
        const listNotif = res.data.map((item: any) => {
          return { content: item.content, valueId: item.valueId };
        });
        setNotification(listNotif);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="notification">
      <Row>
        {notification.map((item: any) => (
          <CardNotification
            content={item.content}
            valueId={item.valueId}
            shopId={shop[0] ? shop[0].id : 1}
          />
        ))}
      </Row>
    </div>
  );
};

export default Notification;
