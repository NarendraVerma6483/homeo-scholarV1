import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookMarked,
  BookOpen,
  Brain,
  FlaskConical,
  LayoutDashboard,
  Loader2,
  LogIn,
  LogOut,
  Medal,
  Menu,
  Search,
  Trophy,
  User,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  {
    to: "/literature",
    label: "Materia Medica",
    icon: BookOpen,
    description: "Browse remedy profiles",
  },
  {
    to: "/flashcards",
    label: "Flashcards",
    icon: Brain,
    description: "Symptom → Remedy study",
  },
  {
    to: "/quiz",
    label: "Quiz",
    icon: Trophy,
    description: "Test your knowledge",
  },
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Track your progress",
  },
  {
    to: "/leaderboard",
    label: "Leaderboard",
    icon: Medal,
    description: "Top scorers by difficulty",
  },
  {
    to: "/repertory",
    label: "Repertory",
    icon: Search,
    description: "Symptom → Remedy lookup",
  },
  {
    to: "/organon",
    label: "Organon",
    icon: BookMarked,
    description: "Aphorisms of Medicine",
  },
];

function NavLink({
  to,
  label,
  icon: Icon,
  active,
}: { to: string; label: string; icon: React.ElementType; active?: boolean }) {
  return (
    <Link
      to={to}
      data-ocid={`nav.${label.toLowerCase().replace(/\s+/g, "_")}.link`}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-smooth",
        active
          ? "bg-primary/15 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, isLoading, principal, login, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-card border-b border-border shadow-medical-sm">
          <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              to="/"
              data-ocid="nav.home.link"
              className="flex items-center gap-2 shrink-0 group"
            >
              <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center shadow-medical-sm">
                <FlaskConical className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200">
                Homeo Scholar
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  {...link}
                  active={pathname === link.to}
                />
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />

              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-mono hidden sm:block truncate max-w-[80px]">
                          {principal?.slice(0, 8)}…
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent data-ocid="nav.principal.tooltip">
                      <p className="font-mono text-xs">{principal}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    data-ocid="nav.logout.button"
                    className="hidden sm:flex gap-1.5 text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={login}
                  data-ocid="nav.login.button"
                  className="gap-1.5"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              )}

              {/* Mobile menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="Open menu"
                    data-ocid="nav.mobile_menu.button"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-72 bg-card"
                  data-ocid="nav.mobile_menu.sheet"
                >
                  <div className="flex flex-col gap-1 mt-6">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-3">
                      Navigation
                    </p>
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        data-ocid={`nav.mobile.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                      >
                        <link.icon className="h-4 w-4 shrink-0" />
                        <div>
                          <div className="font-medium">{link.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {link.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                    {isAuthenticated && (
                      <>
                        <Separator className="my-3" />
                        <Button
                          variant="ghost"
                          className="justify-start gap-2 text-muted-foreground"
                          onClick={() => {
                            logout();
                            setMobileOpen(false);
                          }}
                          data-ocid="nav.mobile_logout.button"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </Button>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-background">{children}</main>

        {/* Footer */}
        <footer className="bg-card border-t border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-primary flex items-center justify-center">
                  <FlaskConical className="h-3 w-3 text-primary-foreground" />
                </div>
                <span className="font-display font-semibold text-sm text-foreground">
                  Homeo Scholar
                </span>
                <Badge variant="outline" className="text-xs">
                  Beta
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                © {new Date().getFullYear()}. Built with love using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  caffeine.ai
                </a>
              </p>
              <div className="flex items-center gap-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
