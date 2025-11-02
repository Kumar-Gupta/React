import type { Route } from "./+types";
import type { Project } from "~/types";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import {AnimatePresence, motion} from 'framer-motion'
import ProjectCard from "~/components/ProjectCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Projects" },
    { name: "description", content: "My website Project Portfolio" },
  ];
}

export async function loader({request}:Route.LoaderArgs): Promise<{projects: Project[]}>{

    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
    const data = await res.json();
    return {projects: data};
}

const ProjectsPage = ({loaderData}: Route.ComponentProps) => {

  const {projects} = loaderData as {projects: Project[]};
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const projectsPerPage = 6;

  // Get unique categories
  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  // Filter by category
  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Get current page's projects
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <>
        <h2 className='text-3xl font-bold text-white mb-4'>🚀ProjectsPage</h2>
        <div className='flex flex-wrap gap-2 mb-8'>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                // Reset page number to 1 when category is changed
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded text-sm ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div layout className="grid gap-6 sm:grid-cols-2">
            {currentProjects.map((project)=> (
              <motion.div key={project.id} layout>
                <ProjectCard project={project}  />
              </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
    </>
  )
}

export default ProjectsPage;