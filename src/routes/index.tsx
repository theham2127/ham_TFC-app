import { createFileRoute } from "@tanstack/react-router";
import { LhriaApp } from "@/components/lhria/app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <LhriaApp />;
}
