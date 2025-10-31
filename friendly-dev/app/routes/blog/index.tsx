import PostCard from "~/components/PostCard";
import type { Route } from "./+types";
import type { PostMeta } from "~/types";
import Pagination from "~/components/Pagination";
import { useState } from "react";


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
  const {posts} = loaderData;

  const totalPosts = posts.length;
  const postPerPage = 2;

  const totalPages = Math.ceil(totalPosts/ postPerPage);
  const indexOfLast = currentPage * postPerPage;
  const indexofFirst = indexOfLast - postPerPage;
  const currentPosts = posts.slice(indexofFirst, indexOfLast)
  console.log(totalPages,indexOfLast,indexofFirst, currentPosts)

  return (
    <div className="max-w-3xl mx-auto mt-10 py-6 px-6 bg-gray-900">
        <h2 className='text-3xl font-bold text-white mb-4'>🗒️ Blog</h2>
        {currentPosts.map((post)=>(
          <PostCard key={post.slug} post={post} />
        ))}
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={(page)=>setCurrentPage(page)} />
        )}
    </div>
  )
}

export default BlogPage;