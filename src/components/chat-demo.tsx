"use client"

import { useChat, type UseChatOptions } from "@ai-sdk/react"
import { Chat } from "@/components/ui/chat"
import { useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"

type ChatDemoProps = {
  initialMessages?: UseChatOptions["initialMessages"],
  conversationId?: string,
}

export default function ChatDemo({ initialMessages }: ChatDemoProps) {
  const router = useRouter()
  const conversationId = useParams()?.id?.[0];

  const { messages, input, handleInputChange, handleSubmit, append, stop, setMessages, isLoading, data } = useChat({
    api: "/api/chat",
    initialMessages,
    body: {
      conversationId,
    },
    onError: (error) => {
      // toast({
      //   title: "Error",
      //   description: error.message,
      //   variant: "destructive",
      // })
    },
  })

  useEffect(() => {
    //@ts-expect-error fuck off
    data && router.replace(`/chat/${data[0].conversationId}`)
  }, [data?.length]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <div className="h-screen w-full flex justify-center sm:p-10 p-5">
      <Chat
        className="grow max-w-[50rem]"
        messages={messages}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={isLoading}
        stop={stop}
        append={append}
        setMessages={setMessages}
        suggestions={[
          "Generate a tasty vegan lasagna recipe for 3 people.",
          "Generate a list of 5 questions for a job interview for a software engineer.",
          "Who won the 2022 FIFA World Cup?",
        ]}
      />
    </div>
  )
}
