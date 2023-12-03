import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  { Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
    imgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Video = mongoose.model("Video", Schema);

export default Video;