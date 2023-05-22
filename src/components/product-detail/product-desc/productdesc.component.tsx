import "./productdesc.style.scss";

interface Props {
  desc?: string;
}

const ProductDesc: React.FC<Props> = ({ desc }) => {
  return (
    <div className="product-desc">
      <h2 className="mgl-25" style={{ paddingTop: "40px" }}>
        Mô tả sản phẩm
      </h2>
      <hr></hr>
      <div className="mgl-25" style={{ paddingTop: "20px" }}>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default ProductDesc;
