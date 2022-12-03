import Content from "../models/contentModel.js";
import asyncHandler from "express-async-handler";

// @desc    GET all content
// @route   GET /api/content
// @access  Public
export const getContent = asyncHandler(async (req, res) => {
  const content = await Content.findOne({ name: "content" });
  res.json(content);
});
// @des PUT edit content
// @route PUT /api/content
// @access Private admin
export const updateContent = asyncHandler(async (req, res) => {
  const content = await Content.findOne({ name: "content" });

  if (content) {
    content.homeMarquee = req.body.homeMarquee || content.homeMarquee;
    content.homeHeroHeading =
      req.body.homeHeroHeading || content.homeHeroHeading;
    content.homeHeroButton = req.body.homeHeroButton || content.homeHeroButton;
    content.homeMissionHeading =
      req.body.homeMissionHeading || content.homeMissionHeading;
    content.homeMissionContent =
      req.body.homeMissionContent || content.homeMissionContent;
    content.homeCsmindHeading =
      req.body.homeCsmindHeading || content.homeCsmindHeading;
    content.homeCsmindSubHeading =
      req.body.homeCsmindSubHeading || content.homeCsmindSubHeading;
      content.homeCsmindContent =
      req.body.homeCsmindContent || content.homeCsmindContent;
    content.homeCsmindVideo =
      req.body.homeCsmindVideo || content.homeCsmindVideo;
    content.homeTechnologyHeading =
      req.body.homeTechnologyHeading || content.homeTechnologyHeading;
    content.homeTechnologyContent =
      req.body.homeTechnologyContent || content.homeTechnologyContent;
    content.homeTechnologyButton =
      req.body.homeTechnologyButton || content.homeTechnologyButton;
    content.homeAcademicHeading =
      req.body.homeAcademicHeading || content.homeAcademicHeading;
    content.homeAcademicContent =
      req.body.homeAcademicContent || content.homeAcademicContent;
    content.homeAcademicButton =
      req.body.homeAcademicButton || content.homeAcademicButton;
      content.counselPrice =
      req.body.counselPrice || content.counselPrice;
      content.signupPrice =
      req.body.signupPrice || content.signupPrice;
      content.teamqPrice =
      req.body.teamqPrice || content.teamqPrice;
      content.diamPrice =
      req.body.diamPrice || content.diamPrice;
      content.resPrice =
      req.body.resPrice || content.resPrice;
      content.uniPrice =
      req.body.uniPrice || content.uniPrice;
      content.sharpPrice =
      req.body.sharpPrice || content.sharpPrice;
      content.chairBrief=req.body.chairBrief || content.chairBrief;
      content.chairAcad=req.body.chairAcad || content.chairAcad;
      content.chairAdmin=req.body.chairAdmin || content.chairAdmin;
      content.chairResearch=req.body.chairResearch || content.chairResearch;
      content.chairAward=req.body.chairAward || content.chairAward;
      content.vidresi=req.body.vidresi || content.vidresi;
      content.viddiam=req.body.viddiam || content.viddiam;
      content.vidteam=req.body.vidteam || content.vidteam;
      content.viduni=req.body.viduni || content.viduni;
      content.vidpro=req.body.vidpro || content.vidpro;
      content.vidsig=req.body.vidsig || content.vidsig;
      content.vidsharp=req.body.vidsharp || content.vidsharp;
      content.notice1=req.body.notice1 || content.notice1

    const updatedContent = await content.save();
    res.json(updatedContent);
  } else {
    res.status(404);
    throw new Error("content not found");
  }
});


