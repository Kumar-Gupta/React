import { FaArrowLeft } from "react-icons/fa";
import type { Route } from "./+types/details"
import type {Project} from '~/types'; 
import { Link } from "react-router";


export async function clientLoader({request, params }: Route.ClientLoaderArgs): Promise<Project> {
  const res = await fetch(`http://localhost:8000/projects/${params.id}`);

    if(!res.ok) throw new Response('Project Not Found', {status:404});

  const project: Project = await res.json();
  return project;
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

const ProductDetailsPage = ({ loaderData }: Route.ComponentProps ) => {
    
    const project  = loaderData;
    console.log(project);
  return (
    <>
    <Link to='/projects' className="flex items-center text-blue-400 hover:text-blue-500 mb-6 transition">
        <FaArrowLeft className="mr-2" /> Back to Projects
    </Link>
    <div className="grid gap-8 md:grid-cols-2 items-start">
        <div>
            <img src={project.image} alt={project.title} className="w-full rounded-lg shadow-md" />
        </div>
        <div>
            <h1 className="text-3xl font-bold mb-4 text-blue-400">{project.title}</h1>
            <p className="text-gray-300 text-sm mb-4">{new Date(project.date).toLocaleDateString()} • {project.category}</p>
            <p className="text-gray-200 mb-6">{project.category}</p>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-block text-white bg-blue-600 transition hover:bg-blue-700 px-6 py-2 rounded">
                View Live Site →
            </a>
        </div>

    </div>
    </>
  )
}

export default ProductDetailsPage