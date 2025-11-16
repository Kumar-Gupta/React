export const fetchGithubUser = async (username: string)  => {
    const res = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`);

    if(!res.ok) throw new Error("User Not Found");
    
    const data = await res.json();
    return data;
}

export const searchGithubUser = async (query: string)  => {
    const res = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}`);

    if(!res.ok) throw new Error("No User Found");
    
    const data = await res.json();
    return data.items;
}

export const checkIfFollowingUser = async ( username : string) => {
    const res = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
       {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
            Accept: 'applcation/vnd.github+json'
        }
       }
    );    

    if(res.status === 204){
        return true; //following
    }else if(res.status == 404){
        return false; //not following
    }else{
        const errorData = await res.json().catch(() => null)
        throw new Error(errorData.message || 'Failed to check follow status')
    }
}