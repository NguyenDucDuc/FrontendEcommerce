import { Progress, Statistic } from "antd"
import "./card-home.style.scss"
import CountUp from 'react-countup'

const CardHome = () => {
    const formatter = (value: number) => <CountUp start={-100} end={value} separator="," />;
    return (
        <div className="card-home">
            <h3>Khách hàng: </h3>
            <div className="card-home-admin">
                <div className="card-home-admin-data">
                    <Progress type="circle" percent={75} format={() => formatter(100)} />
                </div>

            </div>
        </div>

    )
}
export default CardHome