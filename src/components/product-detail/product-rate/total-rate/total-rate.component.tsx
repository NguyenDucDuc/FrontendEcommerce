import { Button, Col, Rate, Row } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Api, { AuthApi, endpoint } from "../../../../configs/Api"
import { RootState, useAppDispatch } from "../../../../store/store"
import "./total-rate.style.scss"
import { createReviewAsyncThunk } from "../../../../store/slices/reviews.slice"




const TotalRate = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const [reviewContent, setReviewContent] = useState<string>("")
    const [rate, setRate] = useState<number>(0)
    const [productBought, setProductBought] = useState<any>([])
    const dispatch = useAppDispatch()
    const { productId } = useParams()
    useEffect(() => {
        const checkBoughtProduct = async () => {
            const res = await Api.post(endpoint.customer.checkBoughtProduct, {
                userId: user.id,
                productId
            })
            console.log(res.data.data)
            setProductBought(res.data.data)
        }
        checkBoughtProduct()
    }, [])
    const handleAddReview = async () => {
        if(productId !== undefined){
            const reqBody: any = {
                rate: rate,
                content: reviewContent,
                productId: +productId
            }
            dispatch(createReviewAsyncThunk(reqBody))
        }
    }

    const handleRateChange = (value: number) => {
        setRate(value)
    }
    return (
        <div className="total-rate">
            <div className="total-rate__margin">
                <Row>
                    <Col span={6} >
                        <h1>4.0 trên 5</h1>
                        <Rate value={4} />
                    </Col>
                    <Col span={18}>
                        <Row gutter={[10, 0]}>
                            <Col span={4}>
                                <Button danger ghost type="primary" style={{ width: '100%', color: 'black' }}>5 sao(5)</Button>
                            </Col>
                            <Col span={4}>
                                <Button danger ghost type="primary" style={{ width: '100%', color: 'black' }}>4 sao(20)</Button>
                            </Col>
                            <Col span={4}>
                                <Button danger ghost type="primary" style={{ width: '100%', color: 'black' }}>3 sao(1)</Button>
                            </Col>
                            <Col span={4}>
                                <Button danger ghost type="primary" style={{ width: '100%', color: 'black' }}>2 sao</Button>
                            </Col>
                            <Col span={4}>
                                <Button danger ghost type="primary" style={{ width: '100%', color: 'black' }}>5 sao</Button>
                            </Col>
                            <Col span={4}>
                                <Button danger ghost type="primary" style={{ width: '100%', color: 'black' }}>5 sao</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            {
                productBought.length > 0 ?
                    <div className="input-review">
                        <TextArea style={{ marginTop: '20px' }} rows={4} placeholder="tối đa 180 ký tự" maxLength={180} onChange={(e) => setReviewContent(e.target.value)} />
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