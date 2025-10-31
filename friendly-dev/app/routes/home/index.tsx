import FeaturedProjects from "~/components/FeaturedProjects";
import type { Route } from "./+types/index";
import type { Project } from "~/types";
import AboutPreview from "~/components/AboutPreview";
import type { PostMeta } from "~/types";
import LatestPosts from "~/components/LatestPosts";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | welcome" },
    { name: "description", content: "Custom Website Development" },
  ];
}

export async function loader({request}: Route.LoaderArgs) : Promise<{ projects: Project[], posts: PostMeta[] }> {
  const url = new URL(request.url)
  console.log(url);
  const [ projectRes, postRes ] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects`),
    fetch(new URL ('/posts-meta.json', url)),
  ]);

  if(!projectRes.ok || !postRes.ok) { throw new Error(' Error in fetching the Project or Post')}
  
  const [projects, posts] = await Promise.all([
    projectRes.json(),
    postRes.json(),
  ])
  
  return {projects, posts}
}

const HomePage = ({loaderData} : Route.ComponentProps) => {

    const {projects, posts} = loaderData;
    console.log(posts)
    return <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts} />
    </>
}

export default HomePage;
