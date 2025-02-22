import mongoose from "mongoose";

const bannerSchema = mongoose.Schema({
  bannerId : {
    type : String,
    required : true,
    unique : true
  },
  bannerName : {
    type : String,
    required : true
  },
  images : [
    {
    type : String,
    }
  ],
  })
  
  const Banner = mongoose.model("banner",bannerSchema);
  
  export default Banner;