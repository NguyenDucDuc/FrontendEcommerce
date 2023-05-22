import { Col, Row } from "antd";
import CardNotification from "./card-notification/cardnotification.component";
import "./notification.style.scss";
import { authAxios } from "../../lib/axios/axios.config";
import { endpoint } from "../../configs/Api";
import { useEffect, useState } from "react";

const Notification = () => {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
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
          <CardNotification content={item.content} valueId={item.valueId} />
        ))}
      </Row>
    </div>
  );
};

export default Notification;
