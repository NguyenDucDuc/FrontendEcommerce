import { Button, Col, Rate, Row, notification } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Api, { AuthApi, endpoint } from "../../../../configs/Api"
import { RootState, useAppDispatch } from "../../../../store/store"
import "./total-rate.style.scss"
import { createReviewAsyncThunk, getAllReviewAsyncThunk } from "../../../../store/slices/reviews.slice"

interface Props {
  rate?: number
}

interface IStatsReview {
  avgRate: number;
  oneStar: number;
  twoStar: number;
  threeStar: number;
  fourStar: number;
  fiveStar: number;
}

const TotalRate: React.FC<Props> = ({ }) => {
  const [api, contextHolder] = notification.useNotification();
  const user = useSelector((state: RootState) => state.user.user)
  const [reviewContent, setReviewContent] = useState<string>("")
  const [rate, setRate] = useState<number>(0)
  const [productBought, setProductBought] = useState<any>([])
  const dispatch = useAppDispatch()
  const { productId } = useParams()
  const [reload, setReload] = useState<boolean>(false)
  const [statsReview, setStatsReview] = useState<IStatsReview>({
    avgRate: 0,
    fiveStar: 0,
    fourStar: 0,
    oneStar: 0,
    threeStar: 0,
    twoStar: 0
  })
  useEffect(() => {
    const checkBoughtProduct = async () => {
      const res = await Api.post(endpoint.customer.checkBoughtProduct, {
        userId: user.id,
        productId
      })
      console.log(res.data.data)
      setProductBought(res.data.data)
    }
    const getStatsReview = async () => {
      const res = await AuthApi().get(endpoint.review.stats(Number(productId)))
      setStatsReview(res.data.data)
    }
    checkBoughtProduct()
    getStatsReview()
  }, [reload])
  const handleAddReview = async () => {
    // check review
    const res = await AuthApi().post(endpoint.review.checkReview(Number(productId)))
    console.log(res.data.data)
    if(res.data.data !== null){
      api.warning({
        message: 'Thông báo',
        description: 'Bạn chỉ được đánh giá 1 lần!',
      });
    }else if (productId !== undefined && reviewContent !== '') {
      const reqBody: any = {
        rate: rate,
        content: reviewContent,
        productId: +productId
      }
      dispatch(createReviewAsyncThunk(reqBody))
      setRate(0)
      setReviewContent('')
      setReload(!reload)
    }
    
  }

  const handleRateChange = (value: number) => {
    setRate(value)
  }
  return (
    <div className="total-rate">
      {contextHolder}
      <div className="total-rate__margin">
        <Row>
          <Col span={6} >
            <h1>{statsReview.avgRate} trên 5</h1>
            <Rate value={statsReview.avgRate} disabled />
          </Col>
          <Col span={18}>
            <Row gutter={[10, 0]}>
              <Col span={4}>
                <Button danger ghost type="primary" style={{ width: '100%', color: 'black' }}>{`5 sao (${statsReview.fiveStar})`}</Button>
              </Col>
              <Col span={4}>
                <Button danger ghost type="primary" style={{ width: '100%', color: 'black' }}>{`4 sao (${statsReview.fourStar})`}</Button>
              </Col>
              <Col span={4}>
                <Button danger ghost type="primary" style={{ width: '100%', color: 'black' }}>{`3 sao (${statsReview.threeStar})`}</Button>
              </Col>
              <Col span={4}>
                <Button danger ghost type="primary" style={{ width: '100%', color: 'black' }}>{`2 sao (${statsReview.twoStar})`}</Button>
              </Col>
              <Col span={4}>
                <Button danger ghost type="primary" style={{ width: '100%', color: 'black' }}>{`1 sao (${statsReview.oneStar})`}</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {
        productBought.length > 0 ?
          <div className="input-review">
            <TextArea value={reviewContent} style={{ marginTop: '20px' }} rows={4} placeholder="tối đa 180 ký tự" maxLength={180} onChange={(e) => setReviewContent(e.target.value)} />
            <Row className="mgt-20">
              <Col span={6}>
                <p>Chọn mức độ hài lòng về sản phẩm</p>
              </Col>
              <Col span={6}>
                <Rate defaultValue={rate} onChange={handleRateChange} />
              </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Col span={6}>
                <Button type="primary" className="btn-color" size="large" onClick={handleAddReview}>Thêm đánh giá</Button>
              </Col>
            </Row>
          </div>
          :
          null
      }
    </div>
  )
}

export default TotalRate