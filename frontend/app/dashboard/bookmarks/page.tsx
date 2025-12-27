"use client";

import { Bookmark, ExternalLink, Trash2 } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function BookmarkedJobsPage() {
  const { bookmarks, removeBookmark } = useAppContext();

  const handleRemove = async (
    e: React.MouseEvent,
    url: string
  ) => {
    e.preventDefault(); // stop link navigation
    e.stopPropagation();

    await removeBookmark(url);
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Bookmark className="text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">
            Saved Jobs
          </h1>
        </div>

        {/* Empty State */}
        {bookmarks.length === 0 && (
          <div className="mt-12 text-center text-gray-400">
            <p className="text-lg font-medium">No saved jobs yet</p>
            <p className="text-sm mt-1">
              Bookmark jobs to see them here
            </p>
          </div>
        )}

        {/* Saved Jobs List */}
        <div className="space-y-4">
          {bookmarks.map((job: any) => (
            <a
              key={job.url}
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                block rounded-xl border border-indigo-400
                p-5 transition-all duration-200
                hover:bg-indigo-400/10 hover:-translate-y-0.5
              "
            >
              <div className="flex items-center justify-between gap-4">

                {/* Job Info */}
                <div>
                  {job.company && (
                    <p className="text-sm text-indigo-300">
                      {job.company}
                    </p>
                  )}
                  <p className="text-white font-semibold">
                    {job.title}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {/* Unbookmark */}
                  <button
                    onClick={(e) => handleRemove(e, job.url)}
                    className="
                      rounded-full p-2
                      border border-yellow-400 text-yellow-400
                      hover:bg-yellow-400/10 transition
                    "
                    aria-label="Remove bookmark"
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* External */}
                  <ExternalLink className="size-4 text-muted-foreground" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
