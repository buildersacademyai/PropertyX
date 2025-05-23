import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import Tokenize from "@/pages/Tokenize";
import Staking from "@/pages/Staking";
import Profile from "@/pages/Profile";
import Marketplace from "./pages/Marketplace";
import Feedback from "./pages/Feedback";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WalletProvider } from "./contexts/WalletContext";

function Router() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/tokenize" component={Tokenize} />
          <Route path="/staking" component={Staking} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/profile" component={Profile} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/explore" component={Explore} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <WalletProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </WalletProvider>
  );
}

export default App;
