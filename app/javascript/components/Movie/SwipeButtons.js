import React from 'react';
import VideoCallOutlinedIcon from '@material-ui/icons/VideoCallOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';

const SwipeButtons = () => {
  return (
    <div className="swipe-buttons">
      <WatchLaterOutlinedIcon fontSize="large" />
      <div>
        <ThumbUpAltOutlinedIcon fontSize="large" />
        <ThumbDownAltOutlinedIcon fontSize="large" />
      </div>
      <VideoCallOutlinedIcon fontSize="large" />
    </div>
  );
};

export default SwipeButtons;
