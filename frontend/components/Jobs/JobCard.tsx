"use client";

import {
  BadgeCheckIcon,
  ChevronRightIcon,
  MapPin,
  Clock,
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

type JobCardProps = {
  company: string;
  role: string;
  location: string;
  type: string;
  link: string;
  isNew?: boolean;
};

export function JobCard({
  company,
  role,
  location,
  type,
  link,
  isNew = false,
}: JobCardProps) {
  const router = useRouter();
  const { addBookmark, removeBookmark, isBookmarked } = useAppContext();

  const saved = isBookmarked(link);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation(); 

    if (saved) {
      await removeBookmark(link);
    } else {
      await addBookmark({
        source: "career",
        title: role,
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
            `/dashboard/careerPageJobs/details?source=career&company=${encodeURIComponent(company)}&url=${encodeURIComponent(link)}&title=${encodeURIComponent(role)}`
          )
        }
      >
        <div className="flex w-full items-center gap-5 py-5 justify-center">
          {/* Icon */}
          <ItemMedia variant="icon">
            <BadgeCheckIcon className="size-20 text-indigo-400" />
          </ItemMedia>

          {/* Content */}
          <ItemContent>
            <ItemTitle>{company}</ItemTitle>

            <ItemDescription className="text-indigo-400">
              {role}
            </ItemDescription>

            <ItemDescription>
              <MapPin className="inline mr-1 size-4" /> {location} ·{" "}
              <Clock className="inline mr-1 size-4" /> {type}
              {isNew && (
                <span className="ml-2 inline-block bg-indigo-500/20 text-red-400 px-2 py-1 rounded-full text-xs font-medium">
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
            <ChevronRightIcon className="size-4 text-muted-foreground transition-transform duration-200 hover:translate-x-1" />
          </ItemActions>
        </div>
      </Item>
    </div>
  );
}
