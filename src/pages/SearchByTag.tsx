import { useLoaderData } from "react-router-dom";
import { Blog } from "../interfaces/BlogInterface";
import BlogCard from "../components/BlogCard";

const SearchByTag = () => {
  const data = useLoaderData() as Blog[];

  return (
    <main>
      <div className="blogs">
        {data?.map((blog) => (
          <BlogCard data={blog} key={blog.id} />
        ))}
      </div>
    </main>
  );
};

export default SearchByTag;
