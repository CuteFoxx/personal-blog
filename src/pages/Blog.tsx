import { useLoaderData } from "react-router-dom";
import { Blog as BlogType } from "../interfaces/BlogInterface";
import splitTags from "../utils/splitTags";
import parse from "html-react-parser";

const Blog = () => {
  const data = useLoaderData() as BlogType;

  let date = new Date(data.created).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    year: "numeric",
    month: "long",
  });

  return (
    <main className="blog-page">
      <div className="blog-page__head-section">
        <div className="blog-page__tags">
          {splitTags(data.tags, "blog-page__tags")}
        </div>
        <h1 className="blog-page__title">{data.title}</h1>
        <div className="blog-page__posted">
          Posted on <span className="date">{date}</span>
        </div>
      </div>

      <div className="blog-page__container">
        <img className="blog-page__image" src={data.image} alt="blog image" />
        <div className="blog-page__body">{parse(data?.body)}</div>
      </div>
    </main>
  );
};

export default Blog;
