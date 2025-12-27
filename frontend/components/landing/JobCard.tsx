import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark } from "lucide-react"

type JobCardProps = {
  company: string
  role: string
  location: string
  type: string
  isNew?: boolean
}

export default function JobCard({
  company,
  role,
  location,
  type,
  isNew = false,
}: JobCardProps) {
  return (
    <Card className="rounded-2xl bg-[#1e293b] border border-white/10">
      <CardContent className="p-6 space-y-4">
        
        {/* Top Row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-sm font-bold text-black">
                {company[0]}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                {role}
              </h3>
              <p className="text-sm text-white/60">
                {location} · {type}
              </p>
            </div>
          </div>

          {isNew && (
            <Badge className="bg-indigo-500/20 text-indigo-400">
              New
            </Badge>
          )}
        </div>

        {/* Placeholder lines */}
        <div className="space-y-2">
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-2 w-3/4 rounded bg-white/10" />
        </div>

        {/* Bottom Row */}
        <div className="flex items-center gap-3">
          <Button className="flex-1 rounded-full bg-indigo-500 hover:bg-indigo-600">
            Apply Now
          </Button>

          <button className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
            <Bookmark className="h-5 w-5 text-white" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}