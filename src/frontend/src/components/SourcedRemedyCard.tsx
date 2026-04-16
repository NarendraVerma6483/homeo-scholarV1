import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ChevronRight, FlaskConical } from "lucide-react";
import { MateriaSource, type SourcedRemedy } from "../backend.d";

// Source badge config
const SOURCE_CONFIG = {
  [MateriaSource.boericke]: {
    label: "Boericke's MM",
    className:
      "bg-[oklch(0.62_0.22_48/0.12)] text-primary border-primary/30 dark:bg-[oklch(0.62_0.22_48/0.18)]",
  },
  [MateriaSource.allensKeynotes]: {
    label: "Allen's Keynotes",
    className: "bg-primary/10 text-primary border-primary/30",
  },
};

interface SourcedRemedyCardProps {
  remedy: SourcedRemedy;
  index?: number;
  className?: string;
}

export function SourcedRemedyCard({
  remedy,
  index = 1,
  className,
}: SourcedRemedyCardProps) {
  const sourceConf = SOURCE_CONFIG[remedy.source];

  return (
    <Link
      to="/sourced-remedy/$id"
      params={{ id: remedy.id }}
      data-ocid={`sourced_remedy.item.${index}`}
      className={cn(
        "group block rounded-lg border border-border bg-card shadow-medical-sm",
        "hover:shadow-medical-md hover:border-primary/30 transition-smooth",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <FlaskConical className="h-4 w-4 text-primary shrink-0" />
              <h3 className="font-display font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200">
                {remedy.name}
              </h3>
            </div>
            {remedy.latinName && (
              <p className="text-body-sm text-muted-foreground ml-6 truncate italic">
                {remedy.latinName}
              </p>
            )}
          </div>
          {/* Source badge */}
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-semibold shrink-0",
              sourceConf.className,
            )}
          >
            {sourceConf.label}
          </Badge>
        </div>

        {/* Top 2 keynotes */}
        <ul className="space-y-1.5 mb-3">
          {remedy.keynotes.slice(0, 2).map((kn) => (
            <li
              key={kn}
              className="flex items-start gap-1.5 text-body-sm text-muted-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
              <span className="line-clamp-1">{kn}</span>
            </li>
          ))}
        </ul>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <p className="text-body-sm text-muted-foreground">
            {remedy.keynotes.length} keynotes
          </p>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-smooth" />
        </div>
      </div>
    </Link>
  );
}
