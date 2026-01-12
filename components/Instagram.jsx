import React, { useState } from "react";
import { InstagramEmbed } from "react-social-media-embed";

const Instagram = ({ handleClick, user }) => {
  return (
    <>
      <div class="input-group-new">
        <label class="label-new">Post Url</label>
        <input
          onChange={handleClick}
          class="input-new"
          type="text"
          value={user.instagramUrl || ''}
          placeholder="Paste Instagram Post URL"
        />
        <div></div>
      </div>

      {user.instagramUrl && /instagram\.com\/(p|reel)\//.test(user.instagramUrl) && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: '1rem' }}>
          <InstagramEmbed url={user.instagramUrl} width={325} height={424} />
        </div>
      )}
    </>
  );
};

export default Instagram;
