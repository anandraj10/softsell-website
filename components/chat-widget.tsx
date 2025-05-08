"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  text: string
  isUser: boolean
  id: string
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! How can I help you with selling your software licenses today?",
      isUser: false,
      id: "welcome",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim() || isLoading) return

    const userMessage = { text: inputValue, isUser: true, id: Date.now().toString() }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // Create context from previous messages
      const context = messages.map((msg) => (msg.isUser ? `User: ${msg.text}` : `Assistant: ${msg.text}`)).join("\n")

      // Generate response using AI SDK
      const { text } = await generateText({
        model: openai("gpt-3.5-turbo"),
        prompt: `
          You are a helpful assistant for SoftSell, a software license resale company.
          
          About SoftSell:
          - We help businesses sell their unused software licenses
          - Our process: Upload License -> Get Valuation -> Get Paid
          - We offer competitive rates and fast payment (within 3 business days)
          - We handle all compliance and legal aspects of license transfers
          - We work with all major software vendors including Microsoft, Adobe, Oracle, and more
          - We have a 98% customer satisfaction rate
          
          Previous conversation:
          ${context}
          
          User: ${inputValue}
          
          Respond as a helpful customer service representative. Keep responses concise (max 3 sentences) and focused on helping the user sell their software licenses. Be friendly and professional.
        `,
        temperature: 0.7,
        maxTokens: 150,
      })

      // Add AI response to messages
      setMessages((prev) => [...prev, { text, isUser: false, id: Date.now().toString() }])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble connecting right now. Please try again later or contact our support team at support@softsell.com.",
          isUser: false,
          id: Date.now().toString(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleExampleQuestion = async (question: string) => {
    if (isLoading) return

    const userMessage = { text: question, isUser: true, id: Date.now().toString() }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      // For example questions, we can either use hardcoded responses or the AI
      let response = ""

      if (question === "How do I sell my license?") {
        response =
          "To sell your license, upload your license details through our secure portal, and we'll provide a valuation within 24 hours. Once you accept our offer, you'll receive payment via your preferred method."
      } else if (question === "What is my license worth?") {
        response =
          "The value depends on software type, version, remaining subscription period, and market demand. Upload your license details for a free, no-obligation valuation."
      } else if (question === "How long does the process take?") {
        response =
          "Our process is quick! You'll receive a valuation within 24 hours, and once you accept, payment is typically processed within 3 business days."
      } else if (question === "What software do you buy?") {
        response =
          "We purchase licenses for most major software vendors including Microsoft, Adobe, Oracle, SAP, Autodesk, and many more. If you're unsure about your specific software, just ask and we'll let you know."
      } else if (question === "Is this legal?") {
        response =
          "Software license resale is completely legal when done properly. We ensure all transfers comply with vendor terms and applicable laws, handling all the legal paperwork for you."
      } else {
        // If it's not a predefined question, use the AI
        const { text } = await generateText({
          model: openai("gpt-3.5-turbo"),
          prompt: `
            You are a helpful assistant for SoftSell, a software license resale company.
            
            About SoftSell:
            - We help businesses sell their unused software licenses
            - Our process: Upload License -> Get Valuation -> Get Paid
            - We offer competitive rates and fast payment (within 3 business days)
            - We handle all compliance and legal aspects of license transfers
            - We work with all major software vendors including Microsoft, Adobe, Oracle, and more
            - We have a 98% customer satisfaction rate
            
            User: ${question}
            
            Respond as a helpful customer service representative. Keep responses concise (max 3 sentences) and focused on helping the user sell their software licenses. Be friendly and professional.
          `,
          temperature: 0.7,
          maxTokens: 150,
        })
        response = text
      }

      setMessages((prev) => [...prev, { text: response, isUser: false, id: Date.now().toString() }])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble connecting right now. Please try again later or contact our support team at support@softsell.com.",
          isUser: false,
          id: Date.now().toString(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const exampleQuestions = [
    "How do I sell my license?",
    "What is my license worth?",
    "How long does the process take?",
    "What software do you buy?",
    "Is this legal?",
  ]

  return (
    <>
      {/* Chat toggle button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={toggleChat}
          className="rounded-full w-14 h-14 p-0 shadow-lg"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          </motion.div>
        </Button>
      </motion.div>

      {/* Chat widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col z-50 max-h-[500px] border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white">SoftSell Support</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">We typically reply within minutes</p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index === messages.length - 1 ? 0 : 0 }}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        : "bg-gray-900 dark:bg-gray-600 text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[80%] p-3 rounded-lg bg-gray-900 dark:bg-gray-600 text-white flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Typing...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Example questions */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {exampleQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => handleExampleQuestion(question)}
                    disabled={isLoading}
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" size="icon" className="h-10 w-10" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={18} />}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
