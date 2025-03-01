import express from 'express';
import { createBanner, deleteBanner, getBanner, updateBanner } from '../controllers/bannerController.js';


const bannerRouter = express.Router();

bannerRouter.get('/',getBanner);
bannerRouter.post('/',createBanner);
bannerRouter.delete("/:bannerId",deleteBanner);
bannerRouter.put("/:bannerId",updateBanner);

export default bannerRouter;