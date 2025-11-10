import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useState } from 'react';
import UserCard from './UserCard';
import { fetchGithubUser } from '../api/github';
import { FaClock, FaUser } from 'react-icons/fa';

const UserSearch = () => {
    const [username, setUsername] = useState('');
    const [submittedUsername, setSubmittedUsername] = useState('');
    const [recentUsers, setRecentUsers] = useState<string[]>([]);

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['users', submittedUsername],
        queryFn: () => fetchGithubUser(submittedUsername),
        enabled : !!submittedUsername,
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = username.trim();
        if(!trimmed) return;
        setSubmittedUsername(trimmed)

        setRecentUsers( (prev) => {
            const updated = [trimmed, ...prev.filter((u) => u !== trimmed)];
            return updated.slice(0, 5)
        } )
    }

  return (
    <>
        <form onSubmit={handleSubmit} className='form'>
            <input 
            type="text" 
            placeholder='Enter the Github Username...'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <button type='submit' className='submit'>Search</button>
        </form>

        {isLoading && <p className='status'>Loading...</p> }
        {isError && <p className='status error'>{error.message}</p> }

        {data && (
           <UserCard user={data} />
        )}

        {recentUsers.length > 0 && (
            <div className="recent-searches">
                <div className="recent-header">
                    <FaClock />
                    <h3>Recent Searches</h3>
                </div>
                <ul>
                    {recentUsers.map((user) => 
                        <li key={user} >
                            <button onClick={()=> {
                                setUsername(user);
                                setSubmittedUsername(user);
                            }}>
                                <FaUser className='user-icon' />
                                {user}
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        )}
    </>
  )
}

export default UserSearch;