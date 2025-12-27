"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import { InternshalaJobCard } from "./InternshalaJobCard";
import { Search, LoaderCircle } from "lucide-react";
import AppPagination from "@/components/layout/AppPagination";

const ITEMS_PER_PAGE = 10;

const InternshalaPage = () => {
  const { internshalaJobs, setInternshalaJobs } = useAppContext();

  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/v1/jobs");
        if (res.data.success) {
          setInternshalaJobs(res.data.jobs);
        }
      } catch (error) {
        console.error("Error fetching Internshala jobs:", error);
      } finally {
        setLoading(false);
        setHasFetched(true);
      }
    };

    fetchData();
  }, [setInternshalaJobs]);

  const filteredJobs = internshalaJobs.filter((job) =>
    `${job.company} ${job.title} ${job.location}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full flex flex-col gap-6 px-4">

      {/* Sticky Search */}
      <div className="sticky top-0 z-30 w-full py-4 backdrop-blur-md">
        <div className="flex justify-center">
          <div className="relative w-full max-w-3xl">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search internships by company, role or location"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="
                w-full pl-12 pr-4 py-3
                rounded-xl border-2 border-indigo-400
                bg-transparent text-white
                outline-none
                focus:ring-2 focus:ring-indigo-400/40
              "
            />
          </div>
        </div>
      </div>

      {/* Initial Loader */}
      {loading && !hasFetched && (
        <div className="flex justify-center py-20">
          <LoaderCircle
            className="animate-spin text-indigo-400"
            size={40}
          />
        </div>
      )}

      {/* Internships */}
      {!loading && hasFetched && (
        <>
          <div className="flex flex-col items-center gap-6 pt-2">
            {paginatedJobs.length ? (
              paginatedJobs.map((job) => (
                <InternshalaJobCard
                  key={job._id}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  duration={job.duration}
                  stipend={job.stipend}
                  posted={job.posted}
                  link={job.link}
                />
              ))
            ) : (
              <p className="text-gray-400 mt-10">
                No internships found
              </p>
            )}
          </div>

          <AppPagination
            currentPage={currentPage}
            totalItems={filteredJobs.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default InternshalaPage;
