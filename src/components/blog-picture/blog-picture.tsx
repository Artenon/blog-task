import { FC } from "react";
import s from "./blog-picture.module.sass";

interface BlogPictureProps {
  src: string;
}

export const BlogPicture: FC<BlogPictureProps> = ({ src }) => (
  <img className={s.pic} src={src} alt="picture" />
);
