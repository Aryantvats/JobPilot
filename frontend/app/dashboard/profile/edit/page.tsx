"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { LoaderCircle, Save, Plus, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

type Education = {
  degree: string;
  branch: string;
  year: number | null;
};

type WorkExperience = {
  company: string;
  role: string;
  duration: string;
  description: string;
};

const EditProfile = () => {
  const { profile, loading, setProfile, router } = useAppContext();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    careerObjective: "",
    skills: "",
    interestedRoles: "",
    projects: "",
    certifications: "",
    githubLink: "",
    resumeDriveLink: "",
    education: [] as Education[],
    workExperience: [] as WorkExperience[],
  });

  useEffect(() => {
    if (!profile) return;

    setFormData({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: profile.email || "",
      phone: profile.phone || "",
      careerObjective: profile.careerObjective || "",
      skills: profile.skills || "",
      interestedRoles: profile.interestedRoles || "",
      projects: profile.projects || "",
      certifications: profile.certifications || "",
      githubLink: profile.githubLink || "",
      resumeDriveLink: profile.resumeDriveLink || "",
      education: profile.education || [],
      workExperience: profile.workExperience || [],
    });
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updated = [...formData.education];

    if (field === "year") {
      updated[index].year = value === "" ? null : Number(value);
    } else {
      updated[index][field] = value;
    }

    setFormData({ ...formData, education: updated });
  };

  const updateExperience = (
    index: number,
    field: keyof WorkExperience,
    value: string
  ) => {
    const updated = [...formData.workExperience];
    updated[index][field] = value;
    setFormData({ ...formData, workExperience: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const { data } = await axios.put("/api/v1/profile/save", formData);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setProfile(data.profile);
      toast.success("Profile updated");
      router.push("/dashboard/profile");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <LoaderCircle className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-10">

        {/* BASIC INFO */}
        <section className="border-2 border-indigo-400 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-white">Basic Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="profile-input w-full" />
            <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="profile-input w-full" />
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="profile-input w-full" />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="profile-input w-full" />
          </div>
        </section>

        {/* CAREER OBJECTIVE */}
        <section className="border-2 border-indigo-400 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Career Objective</h2>
          <textarea name="careerObjective" rows={6} value={formData.careerObjective} onChange={handleChange} className="profile-input w-full resize-none" />
        </section>

        {/* EDUCATION */}
        <section className="border-2 border-indigo-400 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-white">Education</h2>

          {formData.education.map((edu, idx) => (
            <div key={idx} className="space-y-4 border-b border-white/10 pb-6">
              <input value={edu.degree} onChange={(e) => updateEducation(idx, "degree", e.target.value)} placeholder="Degree" className="profile-input w-full" />
              <input value={edu.branch} onChange={(e) => updateEducation(idx, "branch", e.target.value)} placeholder="Branch" className="profile-input w-full" />
              <input type="number" value={edu.year ?? ""} onChange={(e) => updateEducation(idx, "year", e.target.value)} placeholder="Year" className="profile-input w-full" />
              <button type="button" onClick={() => setFormData({ ...formData, education: formData.education.filter((_, i) => i !== idx) })} className="flex items-center gap-2 text-red-400">
                <Trash2 size={16} /> Remove
              </button>
            </div>
          ))}

          <button type="button" onClick={() => setFormData({ ...formData, education: [...formData.education, { degree: "", branch: "", year: null }] })} className="flex items-center gap-2 text-indigo-400">
            <Plus size={16} /> Add Education
          </button>
        </section>

        {/* WORK EXPERIENCE */}
        <section className="border-2 border-indigo-400 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-white">Work Experience</h2>

          {formData.workExperience.map((exp, idx) => (
            <div key={idx} className="space-y-4 border-b border-white/10 pb-6">
              <input value={exp.company} onChange={(e) => updateExperience(idx, "company", e.target.value)} placeholder="Company" className="profile-input w-full" />
              <input value={exp.role} onChange={(e) => updateExperience(idx, "role", e.target.value)} placeholder="Role" className="profile-input w-full" />
              <input value={exp.duration} onChange={(e) => updateExperience(idx, "duration", e.target.value)} placeholder="Duration" className="profile-input w-full" />
              <textarea rows={4} value={exp.description} onChange={(e) => updateExperience(idx, "description", e.target.value)} placeholder="Description" className="profile-input w-full resize-none" />
              <button type="button" onClick={() => setFormData({ ...formData, workExperience: formData.workExperience.filter((_, i) => i !== idx) })} className="flex items-center gap-2 text-red-400">
                <Trash2 size={16} /> Remove
              </button>
            </div>
          ))}

          <button type="button" onClick={() => setFormData({ ...formData, workExperience: [...formData.workExperience, { company: "", role: "", duration: "", description: "" }] })} className="flex items-center gap-2 text-indigo-400">
            <Plus size={16} /> Add Experience
          </button>
        </section>

        {/* SKILLS */}
        <section className="border-2 border-indigo-400 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Skills</h2>
          <textarea name="skills" rows={5} value={formData.skills} onChange={handleChange} className="profile-input w-full resize-none" />
        </section>

        {/* INTERESTED ROLES */}
        <section className="border-2 border-indigo-400 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Interested Roles</h2>
          <textarea name="interestedRoles" rows={4} value={formData.interestedRoles} onChange={handleChange} className="profile-input w-full resize-none" />
        </section>

        {/* PROJECTS */}
        <section className="border-2 border-indigo-400 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Projects</h2>
          <textarea name="projects" rows={8} value={formData.projects} onChange={handleChange} className="profile-input w-full resize-none" />
        </section>

        {/* CERTIFICATIONS */}
        <section className="border-2 border-indigo-400 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Certifications</h2>
          <textarea name="certifications" rows={4} value={formData.certifications} onChange={handleChange} className="profile-input w-full resize-none" />
        </section>

        {/* LINKS */}
        <section className="border-2 border-indigo-400 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Links</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <input name="githubLink" value={formData.githubLink} onChange={handleChange} placeholder="GitHub URL" className="profile-input w-full" />
            <input name="resumeDriveLink" value={formData.resumeDriveLink} onChange={handleChange} placeholder="Resume Drive URL" className="profile-input w-full" />
          </div>
        </section>

        <div className="flex justify-center pt-6">
          <button type="submit" disabled={saving} className="flex items-center gap-3 px-8 py-3 border-2 border-indigo-500 rounded-xl text-white hover:bg-indigo-500/10 transition">
            {saving ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}
            Save Profile
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditProfile;
