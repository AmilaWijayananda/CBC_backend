import express from 'express';
import { createBanner, deleteBanner, getBanner, updateBanner } from '../controllers/bannerController';

const bannerRouter = express.Router();

bannerRouter.get('/',getBanner);
bannerRouter.post('/',createBanner);
bannerRouter.delete("/:productId",deleteBanner);
bannerRouter.put("/:productId",updateBanner);

export default bannerRouter;