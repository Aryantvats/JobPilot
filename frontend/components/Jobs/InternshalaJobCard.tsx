"use client";

import {
  Briefcase,
  ChevronRight,
  MapPin,
  Clock,
  IndianRupee,
  Calendar,
  Bookmark,
} from "lucide-react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

type InternshalaJobCardProps = {
  title: string;
  company: string;
  location: string;
  duration?: string;
  stipend?: string;
  posted?: string | null;
  link: string;
  isNew?: boolean;
};

export function InternshalaJobCard({
  title,
  company,
  location,
  duration,
  stipend,
  posted,
  link,
  isNew = false,
}: InternshalaJobCardProps) {
  const router = useRouter();
  const { addBookmark, removeBookmark, isBookmarked } = useAppContext();

  const saved = isBookmarked(link);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation(); 

    if (saved) {
      await removeBookmark(link);
    } else {
      await addBookmark({
        source: "internshala",
        title,
        company,
        url: link,
      });
    }
  };

  return (
    <div className="flex w-full max-w-3xl flex-col gap-6">
      <Item
        variant="outline"
        size="sm"
        className="
          px-5 border-indigo-400 cursor-pointer
          transition-all duration-300 ease-out
          hover:-translate-y-1 hover:shadow-lg
        "
        onClick={() =>
          router.push(
            `/dashboard/internshalaJobs/details?source=internshala&company=${encodeURIComponent(company)}&url=${encodeURIComponent(link)}&title=${encodeURIComponent(title)}`
          )
        }
      >
        <div className="flex w-full items-center gap-5 py-5">
          {/* Icon */}
          <ItemMedia variant="icon">
            <div className="flex size-16 items-center justify-center rounded-full bg-indigo-500/10">
              <Briefcase className="size-8 text-indigo-400" />
            </div>
          </ItemMedia>

          {/* Content */}
          <ItemContent>
            <ItemTitle>{title}</ItemTitle>

            <ItemDescription className="text-indigo-400 font-medium">
              {company}
            </ItemDescription>

            <ItemDescription className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="size-4" />
                {location}
              </span>

              {duration && (
                <span className="flex items-center gap-1">
                  <Clock className="size-4" />
                  {duration}
                </span>
              )}

              {stipend && (
                <span className="flex items-center gap-1 text-green-400 font-medium">
                  <IndianRupee className="size-4" />
                  {stipend}
                </span>
              )}

              {posted && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="size-4" />
                  {posted}
                </span>
              )}

              {isNew && (
                <span className="ml-2 inline-block rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs font-medium text-red-400">
                  New
                </span>
              )}
            </ItemDescription>
          </ItemContent>

          {/* Actions */}
          <ItemActions className="flex items-center gap-3">
            {/* Bookmark */}
            <button
              onClick={handleBookmark}
              aria-label="Save job"
              className={`
                rounded-full p-2 border transition
                ${
                  saved
                    ? "border-yellow-400 text-yellow-400"
                    : "border-indigo-400 text-indigo-400"
                }
                hover:bg-indigo-400/10
              `}
            >
              <Bookmark
                size={16}
                fill={saved ? "currentColor" : "none"}
              />
            </button>

            {/* Arrow */}
            <ChevronRight className="size-4 text-muted-foreground transition-transform duration-200 hover:translate-x-1" />
          </ItemActions>
        </div>
      </Item>
    </div>
  );
}
