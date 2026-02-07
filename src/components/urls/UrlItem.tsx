import type { Url } from "@/lib/api/urls.ts";
import { Link } from "@tanstack/react-router";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  CalendarIcon,
  ChartLineIcon,
  ClipboardIcon,
  MousePointerClickIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

interface UrlItemProps {
  url: Url;
}

export default function UrlItem({ url }: UrlItemProps) {
  return (
    <div
      key={url.id}
      className="flex w-full items-center justify-between rounded p-4 shadow"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <Link
            to={"/" + url.shortenedUrl}
            className="text-primary text-lg font-bold hover:underline"
          >
            shorteer.com/{url.shortenedUrl}
          </Link>
          <small className="text-muted-foreground">{url.originalUrl}</small>
        </div>

        {/* bottom icons */}
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-1">
            <MousePointerClickIcon />
            <small>{url.clicks}</small>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon size="1rem" />
            <small>{new Date(url.createdAt).toLocaleDateString()}</small>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="space-x-2">
        <CopyToClipboard
          text={`${import.meta.env.VITE_APP_BASE_URL}/${url.shortenedUrl}`}
        >
          <Button className="cursor-pointer">
            Copy <ClipboardIcon />
          </Button>
        </CopyToClipboard>

        <Link to={`/urls/${url.shortenedUrl}/analytics`}>
          <Button variant="secondary" className="cursor-pointer">
            Analytics
            <ChartLineIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
