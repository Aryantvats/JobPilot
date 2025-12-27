"use client";

import { useAppContext } from "@/context/AppContext";
import {
  Github,
  FileText,
  Phone,
  Mail,
  LoaderCircle,
} from "lucide-react";

const Profile = () => {
  const { profile, loading } = useAppContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <LoaderCircle className="animate-spin" size={40} />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        Profile not available
      </div>
    );
  }

  return (
    <div className="relative min-h-screen px-6 py-10">
      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        <div className="rounded-2xl border-2 border-indigo-400 backdrop-blur-xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white">
            {(profile.firstName || profile.lastName)
              ? `${profile.firstName || ""} ${profile.lastName || ""}`
              : "Your Name"}
          </h2>

          <p className="text-gray-300 mt-1">
            {profile.careerObjective || "Add your career objective"}
          </p>

          <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-300">
            <span className="flex items-center gap-2">
              <Mail size={16} />
              {profile.email || "Add email"}
            </span>

            <span className="flex items-center gap-2">
              <Phone size={16} />
              {profile.phone || "Add phone"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border-2 border-indigo-400 backdrop-blur-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              GitHub
            </h3>

            <a
              href={profile.githubLink || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-white transition"
            >
              <Github size={20} />
              {profile.githubLink || "Add GitHub link"}
            </a>
          </div>

          <div className="rounded-2xl border-2 border-indigo-400 backdrop-blur-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Resume
            </h3>

            <a
              href={profile.resumeDriveLink || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-white transition"
            >
              <FileText size={20} />
              {profile.resumeDriveLink || "Add resume link"}
            </a>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-indigo-400 backdrop-blur-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Education
          </h3>

          {profile.education?.length ? (
            profile.education.map((edu, idx) => (
              <div key={idx} className="mb-4">
                <p className="text-white font-medium">
                  {edu.degree} - {edu.branch}
                </p>
                <p className="text-sm text-gray-300">
                  Year: {edu.year}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">
              No education added yet
            </p>
          )}
        </div>

        <div className="rounded-2xl border-2 border-indigo-400 backdrop-blur-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Work Experience
          </h3>

          {profile.workExperience?.length ? (
            profile.workExperience.map((exp, idx) => (
              <div
                key={idx}
                className="mb-6 border-b border-white/10 pb-4 last:border-none"
              >
                <p className="text-lg font-medium text-white">
                  {exp.role}
                </p>
                <p className="text-indigo-300">{exp.company}</p>
                <p className="text-sm text-gray-400">
                  {exp.duration}
                </p>
                <p className="mt-2 text-gray-300 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">
              No experience added yet
            </p>
          )}
        </div>

        <div className="rounded-2xl border-2 border-indigo-400 backdrop-blur-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Skills
          </h3>

          <p className="text-gray-300">
            {profile.skills || "Add skills"}
          </p>
        </div>

        <div className="rounded-2xl border-2 border-indigo-400 backdrop-blur-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Interested Roles
          </h3>

          <p className="text-gray-300">
            {profile.interestedRoles || "Add interested roles"}
          </p>
        </div>

        <div className="rounded-2xl border-2 border-indigo-400 backdrop-blur-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Projects
          </h3>

          <p className="text-gray-300">
            {profile.projects || "Add your projects"}
          </p>
        </div>

        <div className="rounded-2xl border-2 border-indigo-400 backdrop-blur-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Certifications
          </h3>

          <p className="text-gray-300">
            {profile.certifications || "Add certifications"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
