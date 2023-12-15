"use client"

import Form from "@components/Form"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Updateprompt = () => {
    const router = useRouter();
    const searchparams = useSearchParams();
    const promptId= searchparams.get("id")
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({prompt:"", tag:""})
    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if(promptId) getPromptDetails();
    },[promptId])
    const updateprompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert("missing PromptId!");
        
        try {
            const response = await fetch(`/api/prompt/${promptId}`,{
                method: "PATCH",
                body:JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });
            if( response.ok ) router.push('/') 
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
        
    }
  return (
    <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updateprompt}
    
    />
  )
}

export default Updateprompt