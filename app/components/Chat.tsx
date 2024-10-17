'use client'

import { useState, useEffect, useRef } from 'react'
import { useChat } from 'ai/react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { SendIcon, UserIcon } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

const sampleQuestions = [
  "What's the weather like today?",
  "Tell me a joke",
  "How do I learn programming?",
  "What's the capital of ghana?"
]

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat()
  const [typingIndicator, setTypingIndicator] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    setTypingIndicator(isLoading)
  }, [isLoading])

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "An error occurred while fetching the response. Please try again.",
        variant: "destructive",
      })
    }
  }, [error, toast])

  const handleSampleQuestion = (question: string) => {
    handleInputChange({ target: { value: question } } as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            <h2 className="text-2xl font-bold mb-2">Welcome I am AI <span className="text-green-600 dark:text-green-400">Kweku</span></h2>
            <p className="mb-4">How can I assist you today?</p>
            <div className="flex flex-wrap justify-center gap-2">
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSampleQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
              }`}
            >
              {message.role === 'user' ? (
                <UserIcon className="inline-block mr-2 h-4 w-4" />
              ) : (
                <span className="inline-block mr-2 font-bold">AI:</span>
              )}
              {message.content}
            </div>
          </div>
        ))}
        {typingIndicator && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="flex-grow text-black dark:text-white"
          />
          <Button type="submit" disabled={isLoading}>
            <SendIcon className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}