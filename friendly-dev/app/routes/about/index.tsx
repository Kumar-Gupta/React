import React from 'react'

const AboutPage = () => {
  return (
    <>  
      <div className='max-w-5xl mx-auto px-6 py-16 bg-gray-900'>
       {/* Intro Section  */}
        <div className="flex flex-col md:flex-row md:items-start items-center gap-10 mb-12">
          <img 
          src="/images/profile.jpg" 
          alt="profile"
          className='w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md'
          />
          <div>
            <h1 className="text-3xl text-white font-bold mb-8">👋🏼 Hey I'm Kumar</h1>  
            <p className='text-lg text-gray-300'>
              I'm passionate web developer and content creator who loves building friendly digital experience and helping others
              groe into confident, modern developer.
            </p>
          </div>
        </div>
        
        {/* Bio Section  */}
        <div className="mb-12">
          <h2 className="text-2xl text-white font-semibold mb-4">My Mission</h2>
          <p className='text-gray-300 leading-relaxed'>
            After turning my life around, I made a commitment to continuous learning and purposeful work. 
            I now build thoughtful, accessible web apps, create clear tutorials, and mentor others so they can grow into confident,
            modern developers.
          </p>
        </div>

        {/* tech stack  */}
        <h2 className='text-2xl font-semibold text-white mb-4'>
          🚀 Tech I Use
        </h2>
        <ul className='flex flex-wrap gap-4 text-sm text-gray-300 '>
          {[
            'React', 'Next.js', 'Vue', 'TailwindCSS', 'Node.js', 'Laravel', 'Prisma', 'MongoDB', 'Postgresql', 'Docker' 
          ].map((tech) => (
            <li 
            key={tech}
            className='bg-gray-700 px-3 py-1 rounded-md'
            >{tech}</li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default AboutPage;