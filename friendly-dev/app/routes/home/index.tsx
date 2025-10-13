import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | welcome" },
    { name: "description", content: "Custom Website Development" },
  ];
}

export default function Home() {

    return <section>
      Home
    </section>
}
