import style from "./Header.module.css";
import { RiStarSmileLine } from "react-icons/ri";

type HeaderType = {
  title: string;
};

const Header = ({ title }: HeaderType) => {
  return (
    <div className={style.header}>
      {/* <img src="https://picsum.photos/id/237/200/300" /> */}
      <RiStarSmileLine />
      <span>{title}</span>
    </div>
  );
};

export default Header;
