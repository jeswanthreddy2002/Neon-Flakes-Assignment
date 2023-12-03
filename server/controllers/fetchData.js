// controllers/fetchData.js

import Video from "../models/Video.js";

export const getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find();
    res.status(200).json({
      success: true,
      videos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server error. Could not fetch videos.",
    });
  }
};
