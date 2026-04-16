import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { ContentSectionSkeleton } from "./components/LoadingSkeleton";

const HomePage = lazy(() => import("./pages/Home"));
const LiteraturePage = lazy(() => import("./pages/Literature"));
const RemedyDetailPage = lazy(() => import("./pages/RemedyDetail"));
const FlashcardsPage = lazy(() => import("./pages/Flashcards"));
const QuizPage = lazy(() => import("./pages/Quiz"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const LeaderboardPage = lazy(() => import("./pages/Leaderboard"));
const RepertoryPage = lazy(() => import("./pages/Repertory"));
const OrgononPage = lazy(() => import("./pages/Organon"));
const SourcedRemedyDetailPage = lazy(
  () => import("./pages/SourcedRemedyDetail"),
);

function PageFallback() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ContentSectionSkeleton rows={3} />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const literatureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/literature",
  component: LiteraturePage,
});
const remedyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/remedy/$id",
  component: RemedyDetailPage,
});
const flashcardsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/flashcards",
  component: FlashcardsPage,
});
const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: QuizPage,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const leaderboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/leaderboard",
  component: LeaderboardPage,
});
const repertoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/repertory",
  component: RepertoryPage,
});
const organonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/organon",
  component: OrgononPage,
});
const sourcedRemedyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sourced-remedy/$id",
  component: SourcedRemedyDetailPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  literatureRoute,
  remedyDetailRoute,
  flashcardsRoute,
  quizRoute,
  dashboardRoute,
  leaderboardRoute,
  repertoryRoute,
  organonRoute,
  sourcedRemedyDetailRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
