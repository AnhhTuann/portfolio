import React from "react";
import Typography from "@material-ui/core/Typography";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile container_shadow">
      <div className="profile_name">
        <Typography className="name">Tuan</Typography>
        <Typography className="title">Tuan</Typography>
      </div>
      <figure className="profile_image">
        <img src="require()" alt="" />
      </figure>
      <div className="profile_infomation">
        Insert Timeline
        <br />
        <button>My Button</button>
      </div>
    </div>
  );
};

export default Profile;
