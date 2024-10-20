import { LoaderFunctionArgs } from "react-router-dom";

const blogLoader = ({ params }: LoaderFunctionArgs) => {
  const blogId = params.id;

  return fetch("https://alicesblog.site/api/v1/blogs?id=" + blogId);
};

export default blogLoader;
