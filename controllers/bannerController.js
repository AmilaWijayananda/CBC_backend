import Banner from "../models/banner.js";
import { isAdmin } from "./userController.js";

export function getBanner(req, res) {
    Banner.find({}).then((banner) => {
      res.json(banner);
    });
  }
  
  export function createBanner(req,res){
  
    if(!isAdmin(req)){
  
      res.json({
        message : "Please login as administrator"
      })
      return
    }
  
    const newBannerData = req.body;
  
    console.log("Request Banner Details:", newBannerData);
  
    const banner = new Banner(newBannerData);
  
    banner.save().then(()=>{
      res.json({
        message: "Banner created"
      })
    }).catch((error)=>{
      res.status(403).json({
        message: error
      })
    })
  }

  export function deleteBanner(req, res) {
    if (!isAdmin(req)) {
      res.status(403).json({
        message: "Please login as administrator",
      });
      return;
    }
  
    const bannerId = req.params.bannerId;
  
    Banner.deleteOne({ bannerId: bannerId })
      .then(() => {
        res.json({
          message: "Banner deleted",
        });
      })
      .catch((error) => {
        res.status(403).json({
          message: error,
        });
      });
  }

  export function updateBanner(req, res) {
    if (!isAdmin(req)) {
      res.status(403).json({
        message: "Please login as administrator",
      });
      return;
    }
  
    const bannerId = req.params.bannerId;
    const updatedBannerData = req.body;
  
    Banner.updateOne({ bannerId: bannerId }, updatedBannerData)
      .then(() => {
        res.json({
          message: "Banner updated",
        });
      })
      .catch((error) => {
        res.status(403).json({
          message: error,
        });
      }); 
    }