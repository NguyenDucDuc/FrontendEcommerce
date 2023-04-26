import React, { useEffect, useRef, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { authAxios, axiosClient } from "../../lib/axios/axios.config";
import { endpoint } from "../../configs/Api";
import "./payment.style.scss";
import { Button } from "antd";
import { formatCurrency } from "../../utils/common";

interface Props {
  amount?: number;
  shopId: number;
  testOrder: (chargeId?: string) => void;
}

const Stripe: React.FC<Props> = ({ amount, shopId, testOrder }) => {  
  const btnRef = useRef<any>(null);
  const [stripeToken, setStripeToken] = useState<any>(null);

  const onToken = (token: any) => {
    setStripeToken(token);
  };
  const updateTotalPriceShop = async () => {
    const res = await axiosClient.put(endpoint.shop.update(shopId), {
      amount: amount,
    });
  };
  const makeRequest = async () => {    
    try {
      const res: any = await authAxios().post(endpoint.payment.checkout, {
        token: { id: stripeToken.id },
        amount: amount,
      });
      await testOrder(res.id as string);
      await updateTotalPriceShop();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    stripeToken && makeRequest();
  }, [stripeToken]);
  return (
    <>
      <Button
        onClick={() => btnRef.current.onClick()}
        type="primary"
        className="btn-payment"
        size="large"
        style={{ width: "100%" }}
      >
        Thanh toán
        <StripeCheckout
          ref={btnRef}
          name="NamDNH"
          image="https://res.cloudinary.com/de5pwc5fq/image/upload/v1666019608/825b219385d46_k9zpfl.png"
          billingAddress
          shippingAddress
          description={`Tổng tiền ${formatCurrency(amount as number)}`}
          amount={amount}
          token={onToken}
          currency="vnd"
          stripeKey={process.env.REACT_APP_STRIPE_KEY as string}
        />
      </Button>
    </>
  );
};

export default Stripe;
