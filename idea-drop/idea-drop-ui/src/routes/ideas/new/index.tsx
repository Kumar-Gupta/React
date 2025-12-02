import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { createIdea } from '@/api/ideas';
import { useMutation } from '@tanstack/react-query';

export const Route = createFileRoute('/ideas/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const[title, setTitle] = useState('')
  const[summary, setSummary] = useState('')
  const[description, setDescription] = useState('')
  const[tags, setTags] = useState('')

  const { mutateAsync, isPending} = useMutation({
    mutationFn: createIdea,
    onSuccess: () => {
      navigate({ to : '/ideas'})
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!title.trim() || !summary.trim() || !description.trim() || !tags.trim()){
      alert('Please fill in all fields')
      return ;
    }

    try {
      await mutateAsync({
        title,
        summary,
        description,
        tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '')
      })
    } catch (error) {
      console.log('Error', error)
      alert('Something went wrong')
    }
  }

  return <div className='space-y-4'>
      <div className="flex justify-between items-center">
        <h1 className='text-2xl font-bold'>Create New Idea</h1>
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
          value={tags}
          onChange={(e) => setTags(e.target.value)}
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
            { isPending ? 'Creating...' : 'Create Idea' }
          </button>
        </div>
      </form>
  </div>
}
