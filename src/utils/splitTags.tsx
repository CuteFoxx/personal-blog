import { Link } from "react-router-dom";

const splitTags = (tags: string, tagClass: string) => {
  if (tags.trim()) {
    return tags.split(" ").map((tag) => (
      <Link
        to={"/tag/" + tag}
        key={tag}
        className={`${tagClass} ${tagClass}--${tag}`}
      >
        {tag}
      </Link>
    ));
  }
};

export default splitTags;
