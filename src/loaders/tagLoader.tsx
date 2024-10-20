import { LoaderFunctionArgs } from "react-router-dom";

const tagLoader = ({ params }: LoaderFunctionArgs) => {
  const tag = params.tag;

  return fetch("https://alicesblog.site/api/v1/blogs?tag=" + tag);
};

export default tagLoader;
