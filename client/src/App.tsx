import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import LandingPageV2 from "./pages/LandingPageV2";
import AuthPage from "./pages/AuthPage";
import CheckoutPageV2 from "./pages/CheckoutPageV2";
import SuccessPage from "./pages/SuccessPage";
import DNSTutorialPage from "./pages/DNSTutorialPage";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={LandingPageV2} />
      <Route path="/login" component={AuthPage} />
      <Route path="/checkout" component={CheckoutPageV2} />
      <Route path="/success" component={SuccessPage} />
      <Route path="/dns-tutorial" component={DNSTutorialPage} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
