// @react-compiler
"use client"

import { useEffect } from "react"
import { useChat, type UseChatOptions } from "@ai-sdk/react"
import { Chat as ChatUI } from "@/components/ui/chat"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

type ChatDemoProps = {
  initialMessages?: UseChatOptions["initialMessages"],
  conversationTitle?: string,
}

// TODO: Cache this component because it get re-created every time the 

export default function Chat({
  initialMessages, conversationTitle = "New Conversation"
}: ChatDemoProps) {
  const router = useRouter()
  const conversationId = useParams()?.id?.[0];

  const { messages, input, handleInputChange, handleSubmit, append, stop, setMessages, status, data } = useChat({
    api: "/api/chat",
    initialMessages,
    body: {
      conversationId,
    },
    onError: (error) => {
      console.log(error);
      toast(error.message)
    },
  })

  useEffect(() => {
    //@ts-expect-error fuck off
    data && router.replace(`/chat/${data[0].conversationId}`, { reload: false })
  }, [data?.length]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center sm:py-4 px-8">
      <ChatUI
        className="max-w-[50rem] grow"
        messages={messages}
        title={conversationTitle}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={status !== 'ready' || (!conversationId && messages.length >= 2)}
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
