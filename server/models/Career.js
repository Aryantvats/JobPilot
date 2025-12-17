import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
    company: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String },
    type: { type: String },
    link: { type: String },
    jdFetchedAt: { type: Date },
    descriptionHtml: { type: String }

});

const Career = mongoose.model("Career", careerSchema);
export default Career;