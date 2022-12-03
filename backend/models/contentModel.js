import mongoose from 'mongoose';

const contentSchema=new mongoose.Schema(

    {
        name:{type:String,default:'content'},
        homeMarquee:{type:String},
        homeHeroHeading:{type:String},
        homeHeroButton:{type:String},
        homeMissionHeading:{type:String},
        homeMissionContent:{type:String},
        homeCsmindHeading:{type:String},
        homeCsmindSubHeading:{type:String},
        homeCsmindContent:{type:String},
        homeCsmindVideo:{type:String},
        homeTechnologyHeading:{type:String},
        homeTechnologyContent:{type:String},
        homeTechnologyButton:{type:String},
        homeAcademicHeading:{type:String},
        homeAcademicContent:{type:String},
        homeAcademicButton:{type:String},
        counselPrice:{type:Number},
        signupPrice:{type:Number},
        teamqPrice:{type:Number},
        diamPrice:{type:Number},
        resPrice:{type:Number},
        uniPrice:{type:Number},
        sharpPrice:{type:Number},
        chairBrief:{type:String},
        chairAdmin:{type:String},
        chairAcad:{type:String},
        chairResearch:{type:String},
        chairAward:{type:String},
        vidresi:{type:String},
        viddiam:{type:String},
        vidteam:{type:String},
        viduni:{type:String},
        vidpro:{type:String},
        vidsig:{type:String},
        vidsharp:{type:String},
        notice1:{type:String}
    }
)

const Content=mongoose.model("Content",contentSchema);
export default Content;