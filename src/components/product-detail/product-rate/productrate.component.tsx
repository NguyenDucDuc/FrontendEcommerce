import { Col, Pagination, Rate, Row } from "antd"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllReviewAsyncThunk } from "../../../store/slices/reviews.slice";
import { RootState, useAppDispatch } from "../../../store/store";
import CardRate from "./card-rate/cardrate.component"
import "./productrate.style.scss"
import TotalRate from "./total-rate/total-rate.component"

interface IPropsReview {
    id: number;
    firstName: string;
    lastName: string;
    rate: number;
    content: string;
    createdAt: string;
    img: string;
}


interface IProps {
    listReviews: IPropsReview[];
}

interface Props {
    rate?: number

}

const ProductRate:React.FC<Props> = ({ rate}) => {
    const listReviews = useSelector((state: RootState) => state.reviews.listReviews)
    const amountPage = useSelector((state: RootState) => state.reviews.amountPage)
    const amountReview = useSelector((state: RootState) => state.reviews.amountReview)
    const {productId} = useParams()
    const dispatch = useAppDispatch()
    const handleChangePage = (page:number, pageSize: number) => {
        const body = {
            productId: productId,
            page: page
        }
        dispatch(getAllReviewAsyncThunk(body))
    }
    useEffect( () => {

    }, [])
    return (
        <div className="product-rate" >
            <h2 className="mgl-25" style={{ paddingTop: '40px' }}>Đánh giá sản phẩm</h2>
            <hr></hr>
            
            <TotalRate rate={rate} />
            
            <div className="user-rate">
                {/* Comment */}
                {listReviews.length > 0 ?
                    listReviews.map((item, idx) => <CardRate
                        key={idx}
                        id={item.id}
                        content={item.content}
                        createdAt={item.createdAt}
                        img={item.User.avatar}
                        rate={item.rate}
                        firstName={item.User.firstName}
                        lastName={item.User.lastName}
                    />)
                    :
                    null
                }
                <Row>
                    <Col span={9}></Col>
                    <Col span={6}>
                        <Pagination defaultCurrent={1} total={amountReview} pageSize={6} onChange={handleChangePage} />
                    </Col>
                    <Col span={9}></Col>
                </Row>
            </div>
        </div>
    )
}

export default ProductRate

