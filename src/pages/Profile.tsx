import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import CreateBlog from "../components/CreateBlog";

const Profile = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (context && !context.user) {
      navigate("/login");
    }
  }, []);

  if (context && context.user) {
    return (
      <div className="profile-page">
        <CreateBlog token={context.user.token} />
      </div>
    );
  }
};

export default Profile;
