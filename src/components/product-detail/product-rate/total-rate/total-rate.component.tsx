import { Button, Col, Rate, Row } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Api, { endpoint } from "../../../../configs/Api"
import { RootState } from "../../../../store/store"
import "./total-rate.style.scss"



const TotalRate = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const [productBought, setProductBought] = useState<any>([])
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
                        <TextArea style={{ marginTop: '20px' }} rows={4} placeholder="maxLength is 6" maxLength={6} />
                        <Row className="mgt-20">
                            <Col span={6}>
                                <p>Chọn mức độ hài lòng về sản phẩm</p>
                            </Col>
                            <Col span={6}>
                                <Rate defaultValue={0} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                            <Col span={6}>
                                <Button type="primary" className="btn-color" size="large">Thêm đánh giá</Button>
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