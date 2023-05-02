import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../../store/store";
import Header from "../header/header.component";
import "./main.style.scss";
import { Footer } from "../footer/footer.component";

const MainLayout = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <Outlet />
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
