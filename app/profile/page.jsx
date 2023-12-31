"use client"

import Profile from "@components/Profile"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [myPosts, setMyPosts] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json();

            setMyPosts(data)
        }
        if(session?.user.id) fetchdata()
    },[session?.user.id])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }
    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            "Are you sure want to delete this prompt?"
        )
        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method:'DELETE'
                });
                const filteredPosts = myPosts.filter((item) => item._id !== post._id);
                setMyPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }
  return (
    <Profile
        name='My'
        desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile