import { fetchIdeaDetails, updateIdea } from '@/api/ideas'
import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'

const ideaQueryOptions = (id : string) => (
    queryOptions({
        queryKey: ['idea', id],
        queryFn: () => fetchIdeaDetails(id)
    })
)

export const Route = createFileRoute('/ideas/$ideaId/edit')({
  component: ideaEditPage,
  loader: async ({params, context: {queryClient}}) => (
    queryClient.ensureQueryData(ideaQueryOptions(params.ideaId))
  ) 
})

function ideaEditPage() {

  const { ideaId } = Route.useParams();
  const navigate = useNavigate();
  const {data: idea} = useSuspenseQuery(ideaQueryOptions(ideaId))

  const [title, setTitle] = useState(idea.title);
  const [summary, setSummary] = useState(idea.summary);
  const [description, setDescription] = useState(idea.description);
  const [tagsInput, setTagsInput] = useState(idea.tags.join(', '));

  const {mutateAsync, isPending} = useMutation({
    mutationFn: () => updateIdea(ideaId, {
      title,
      summary,
      description,
      tags: tagsInput.split(', ').map((t) => t.trim()).filter(Boolean),
    }),
    onSuccess: () => {
      navigate({to: "/ideas/$ideaId", params: {ideaId}})
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await mutateAsync();
  }

  return (
    <div className='space-y-4'>
      <div className="flex justify-between items-center">
        <h1 className='text-2xl font-bold'>Edit Idea</h1>
        <Link 
        to='/ideas/$ideaId' 
        params={{ideaId}}
        className='text-sm text-blue-600 hover:underline'
        >   Back To Idea</Link>
      </div>
      <form onSubmit={handleSubmit} action="" className='space-y-2'>
        <div>
          <label htmlFor="title" className='block text-gray-700 font-medium not-visited:mb-1'>Title</label>
          <input 
          type="text"
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Enter idea title'
          />
        </div>

        <div>
          <label htmlFor="summary" className='block text-gray-700 font-medium mb-1'>Summary</label>
          <input 
          type="text" 
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Write a summary of your idea'
          />
        </div>

        <div>
          <label htmlFor="description" className='block text-gray-700 font-medium mb-1'>Description</label>
          <input 
          type="text" 
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Write a description of your idea'
          />
        </div>

        <div>
          <label htmlFor="tags" className='block text-gray-700 font-medium mb-1'>Tags</label>
          <input 
          type="text" 
          id="tags"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Write a tags of your idea'
          />
        </div>

        <div className='mt-5'>
          <button 
          disabled={isPending}
          type="submit"
          className='block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition
          disabled:opacity-50 disabled:cursor-not-allowed'
          >
            { isPending ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
  </div>
  )
}