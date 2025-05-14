import style from "./Tag.module.css";

type TagProps = {
  content: string;
};

const Tag = ({ content }: TagProps) => {
  return <div className={style.tag}>{content}</div>;
};

export default Tag;
