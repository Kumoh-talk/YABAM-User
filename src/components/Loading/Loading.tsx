import style from "./Loading.module.css"
import { RiLoader2Fill } from "react-icons/ri";

type LoadingProps = {
  msg: string;
};

const Loading = ({ msg }: LoadingProps) => {
  return (
    <div className={style.loading}>
     <RiLoader2Fill />
     <p>{msg}</p>
    </div>
  );
};

export default Loading;
