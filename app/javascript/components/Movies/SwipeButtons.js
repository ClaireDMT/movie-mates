import React from 'react';
import VideoCallOutlinedIcon from '@material-ui/icons/VideoCallOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from '@material-ui/core';

const SwipeButtons = () => {
  return (
    <div className="swipe-buttons">
      <IconButton className="btn__watch__later" >
        <WatchLaterOutlinedIcon fontSize="large" />
      </IconButton>
      <div>
        <IconButton className="btn__thumb__up">
          <ThumbUpAltOutlinedIcon fontSize="large" />
        </IconButton>
        <IconButton className="btn__thumb__down">
          <ThumbDownAltOutlinedIcon fontSize="large" />
        </IconButton>
      </div>
      <IconButton className="btn__watch__now">
        <VideoCallOutlinedIcon fontSize="large"  />
      </IconButton>

    </div>
  );
};

export default SwipeButtons;
