import type { Route } from "./+types";
import type { Project } from "~/types";
import ProductCard from "~/components/ProductCard";

export async function loader({request}:Route.LoaderArgs): Promise<{projects: Project[]}>{

    const res = await fetch('http://localhost:8000/projects ');
    const data = await res.json();
    return {projects: data};
}

const ProjectsPage = ({loaderData}: Route.ComponentProps) => {

  const {projects} = loaderData as {projects: Project[]};

  return (
    <section>
        <h2 className='text-3xl font-bold text-white mb-4'>🚀ProjectsPage</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project)=>{
           return (
            <ProductCard key={project.id} project={project} />
          )})}
        </div>
        </section>
  )
}

export default ProjectsPage;