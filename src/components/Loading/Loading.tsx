import style from "./Loading.module.css";
import LoadingGIF from "../../assets/Loading.gif";

type LoadingProps = {
  msg: string;
};

const Loading = ({ msg }: LoadingProps) => {
  return (
    <div className={style.loading}>
      <img src={LoadingGIF} />
      <p>{msg}</p>
    </div>
  );
};

export default Loading;
