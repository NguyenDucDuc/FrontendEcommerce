import "./cardcategory.style.scss"
import "../style-commond/commond.style.scss"


interface IProps {
    src?: string;
    categoryName?: string;
}

const CardCategory: React.FC<IProps> = ({ src, categoryName }) => {
    return (
        <div className="card-category">
            <div className="card-category-img">
                <img src={src} />
            </div>
            <h2 className="text-center text-color " style={{paddingBottom: '20px'}}>{categoryName}</h2>
        </div>
    )
}

export default CardCategory