"use client"

import Form from "@components/Form"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react"

const CreatePrompt = () => {
    const [post, setPost] = useState({ prompt: "" , tag: ""});
    const [submitting, setSubmitting] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const createPrompt = async(e) => {
        e.preventDefault()
        setSubmitting(true)
        
        try {
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                  prompt: post.prompt,
                  userId: session?.user.id,
                  tag: post.tag,
                }),
              });

            if( response.ok) {
                console.log("success");
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }

    }
  return (
    <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}

    />
  )
}

export default CreatePrompt