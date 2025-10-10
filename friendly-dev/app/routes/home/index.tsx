import type { Route } from "./+types/index";
import Hero from "~/components/Hero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | welcome" },
    { name: "description", content: "Custom Website Development" },
  ];
}

export default function Home() {

    return <section>
      <Hero name="Kumar" />
    </section>
}
