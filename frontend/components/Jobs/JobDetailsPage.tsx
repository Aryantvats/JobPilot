"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import {
  LoaderCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type JobSource = "internshala" | "career";

const JobDetailsPage = () => {
  const searchParams = useSearchParams();
  const { loading, setLoading } = useAppContext();

  const source = (searchParams.get("source") as JobSource) || "internshala";
  const company = searchParams.get("company") || "";
  const title = searchParams.get("title") || "Job";
  const rawUrl = searchParams.get("url");
  const url = rawUrl ? decodeURIComponent(rawUrl) : undefined;

  const [description, setDescription] = useState("");

  /* 🔥 Referral state (career only) */
  const [generating, setGenerating] = useState(false);
  const [referral, setReferral] = useState<{
    connectionMessage: string;
    referralMessage: string;
  } | null>(null);

  /* ------------------ Fetch Job Description ------------------ */

  useEffect(() => {
    if (!url) return;

    setLoading(true);

    const fetchJD = async () => {
      try {
        if (source === "career") {
          const res = await axios.get("/api/v1/careerJobs/jd", {
            params: { company, url },
          });

          if (res.data.success) {
            setDescription(res.data.description || "");
          }
        } else {
          const res = await axios.get("/api/v1/jobs/detail", {
            params: { url },
          });

          if (res.data.success) {
            setDescription(res.data.job?.descriptionHtml || "");
          }
        }
      } catch (err) {
        console.error("Failed to fetch JD:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJD();
  }, [url, source, company, setLoading]);

  /* ------------------ Generate Referral (Career ONLY) ------------------ */

  const handleGenerateReferral = async () => {
    if (!url) return;

    try {
      setGenerating(true);

      const res = await axios.post("/api/v1/referral/generate", {
        url, // ✅ ONLY url, backend resolves job
      });

      if (res.data.success) {
        setReferral(res.data.messages);
      }
    } catch (err) {
      console.error("Failed to generate referral", err);
    } finally {
      setGenerating(false);
    }
  };

  /* ------------------ Loading States ------------------ */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <LoaderCircle className="animate-spin" size={40} />
      </div>
    );
  }

  if (!description) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Job description not available
      </div>
    );
  }

  /* ------------------ UI ------------------ */

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="rounded-xl border-2 border-indigo-400 p-6">
          {company && (
            <p className="text-sm uppercase tracking-wide text-indigo-300">
              {company}
            </p>
          )}
          <h1 className="text-2xl font-bold text-white">
            {title} – Job Description
          </h1>
        </div>

        {/* 🔥 Generate Referral (Career ONLY) */}
        {source === "career" && (
          <div className="rounded-xl border-2 border-yellow-400/70 bg-yellow-400/5 p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-yellow-300 font-medium">
                  AI Referral Assistant
                </p>
                <p className="text-white font-semibold">
                  Generate a personalized LinkedIn referral message for this role
                </p>
              </div>

              <button
                onClick={handleGenerateReferral}
                disabled={generating}
                className="
                  inline-flex items-center gap-2
                  px-6 py-3 rounded-xl
                  bg-yellow-400 text-black font-semibold
                  hover:bg-yellow-300 transition
                  disabled:opacity-60
                "
              >
                <Sparkles size={18} />
                {generating ? "Generating..." : "Generate Referral"}
              </button>
            </div>
          </div>
        )}
        {referral && (
          <div className="rounded-xl border-2 border-green-400 p-6">
            <h2 className="text-lg font-bold text-green-300 mb-4">
              Generated Referral Messages
            </h2>

            <Accordion
              type="single"
              defaultValue="referral"
              collapsible
              className="w-full"
            >
              <AccordionItem value="connection">
                <AccordionTrigger className="text-white">
                  Connection Message
                </AccordionTrigger>
                <AccordionContent>
                  <div className="rounded-lg bg-black/40 p-4 text-white whitespace-pre-wrap">
                    {referral.connectionMessage}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="referral">
                <AccordionTrigger className="text-white">
                  Referral Request Message
                </AccordionTrigger>
                <AccordionContent>
                  <div className="rounded-lg bg-black/40 p-4 text-white whitespace-pre-wrap">
                    {referral.referralMessage}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}


        {/* Job Description */}
        <div className="rounded-xl border-2 border-indigo-400 p-6">
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        {/* Apply Button */}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center gap-2 px-6 py-3
              border-2 border-indigo-400 rounded-xl text-white
              hover:bg-indigo-400/10 transition
            "
          >
            <ExternalLink size={18} />
            Apply on {source === "career" ? "Company Site" : "Internshala"}
          </a>
        )}

      </div>
    </div>
  );
};

export default JobDetailsPage;
