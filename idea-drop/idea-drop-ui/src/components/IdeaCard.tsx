import type { Idea } from "@/types";
import { Link } from "@tanstack/react-router";
import clsx from 'clsx'

const IdeaCard = ({idea, button = true} : {idea: Idea, button?: boolean}) => {

    const linkClasses = clsx({
        'text-blue-600 hover:underline': !button,
        'text-center mt-4 inline-block bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition': button
    })

  return (
    <div 
    className="border border-gray-300 p-4 rounded shadow bg-white flex flex-col justify-between"
    key={idea._id}
    >
        <h3 className="text-lg font-bold text-gray-900">{idea.title}</h3>
        <p className="text-gray-600 mb-2">{idea.summary}</p>
        <a href="#" className=""> </a>
        <Link 
        to='/ideas/$ideaId' 
        params={{ideaId: idea._id.toString()}}
        className={linkClasses}
        > 
        {button ? 'View Idea' : 'Read more ... '}
        </Link>
    </div>
  )
}

export default IdeaCard;