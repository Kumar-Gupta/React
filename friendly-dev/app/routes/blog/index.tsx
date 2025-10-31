import PostCard from "~/components/PostCard";
import type { Route } from "./+types";
import type { PostMeta } from "~/types";
import Pagination from "~/components/Pagination";
import { useState } from "react";
import PostFilter from "~/components/PostFilter";


export async function loader({request}:Route.LoaderArgs): Promise<{posts : PostMeta[]}> {
  const url = new URL('/posts-meta.json', request.url)
  const res = await fetch(url.href)
  
  if(!res.ok) throw new Error('Failed to fetch data')
  
  const data =await res.json();
  data.sort((a: PostMeta,b : PostMeta)=>{
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
  return {posts : data}
}

const BlogPage = ({loaderData}: Route.ComponentProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const {posts} = loaderData;

  const postPerPage = 4;
  
  const filteredPosts = posts.filter((post)=>
    {
      const query = searchQuery.toLowerCase();
      return (post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query))
    }
  )
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts/ postPerPage);
  const indexOfLast = currentPage * postPerPage;
  const indexofFirst = indexOfLast - postPerPage;
  const currentPosts = filteredPosts.slice(indexofFirst, indexOfLast)

  return (
    <div className="max-w-3xl mx-auto mt-10 py-6 px-6 bg-gray-900">
        <h2 className='text-3xl font-bold text-white mb-4'>🗒️ Blog</h2>

        <PostFilter searchQuery={ searchQuery } onSearchChange={(query) => {
          setSearchQuery(query)
          setCurrentPage(1)
        }} />

        <div className="space-y-8">
          {currentPosts.length === 0 ? (
            <p className="text-gray-400 text-center">
              No posts found
            </p>
          ) : 
            currentPosts.map((post)=>(
              <PostCard key={post.slug} post={post} />
            ))
          }
        </div>
        
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={(page)=>setCurrentPage(page)} />
        )}
    </div>
  )
}

export default BlogPage;