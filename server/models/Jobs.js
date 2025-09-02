import mongoose from 'mongoose';

const jobsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    link: { type: String },
    duration: { type: String },
    posted: { type: String },
    stipend: { type: String }
});

const Jobs = mongoose.model("Jobs", jobsSchema);
export default Jobs;