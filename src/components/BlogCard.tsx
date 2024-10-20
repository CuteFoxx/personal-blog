import { Link } from "react-router-dom";
import { Blog } from "../interfaces/BlogInterface";
import splitTags from "../utils/splitTags";
import parse from "html-react-parser";

const BlogCard = ({ data }: { data: Blog }) => {
  const trimLongText = (text: string, length: number = 125) => {
    if (text.length < length) {
      return text;
    }
    return text.split("").slice(0, length).join("").trim() + "...";
  };
  let date = new Date(data.created).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    year: "numeric",
    month: "long",
  });
  return (
    <section className="blog-card">
      <Link to={"/blog/" + data.id}>
        <div className="blog-card__image-wrapper">
          <img className="blog-card__image" src={data.image} alt={data.title} />
        </div>
      </Link>
      <div className="blog-card__created">{date}</div>
      <Link className="blog-card__title" to={"/blog/" + data.id}>
        <h2>{data.title}</h2>
      </Link>
      <div className="blog-card__body">{parse(trimLongText(data?.body))}</div>
      <div className="blog-card__tags">
        {splitTags(data.tags, "blog-card__tag")}
      </div>
    </section>
  );
};

export default BlogCard;
