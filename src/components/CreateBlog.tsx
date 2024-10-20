import { useEffect, useState } from "react";
import Editor from "./Editor";

const CreateBlog = ({ token }: { token: string }) => {
  const [body, setBody] = useState<string>("");
  const [title, settitle] = useState<string>("");
  const [image, setImage] = useState<any>();
  const [tags, setTags] = useState<string>("");
  const [msg, setMsg] = useState("");
  const formData = new FormData();

  useEffect(() => {
    document.cookie = `token=${token}`;
  });

  formData.append("title", title);
  formData.append("body", body);
  formData.append("image", image);
  formData.append("tags", tags);
  formData.append("token", token);

  const handleSubmit = () => {
    fetch("/api/v1/blogs", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.status === 200) {
        setMsg("Post created");
        settitle("");
      } else {
        setMsg("error");
      }
    });
  };

  return (
    <>
      {msg}
      <form
        action="https://alicesblog.site/api/v1/blogs"
        method="POST"
        encType="multipart/form-data"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="image">Blog image</label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e) => {
            if (!e.target.files) return;
            setImage(e?.target?.files[0]);
          }}
        />
        <label htmlFor="title">Blog title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <label htmlFor="">TAGS</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
          }}
        />
        <Editor setData={setBody} />
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
    </>
  );
};

export default CreateBlog;
