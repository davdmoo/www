"use client"

import { MessageType } from "@/app/lib/enums/message_type.enums"
import getGuestMessages from "@/app/lib/logics/client/get_guest_messages.logics"
import GuestMessage from "@/app/lib/models/guest_message.models"
import { FormEvent, RefObject, useEffect, useRef, useState } from "react"
import PageHeader from "../components/page_header.components"

export default function GuestBookPage() {
  // form data
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [messageType, setMessageType] = useState<MessageType>(MessageType.public)

  const [messages, setMessages] = useState<GuestMessage[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    // get all guest messages data on first load
    getGuestMessages()
      .then((data) => {
        setMessages(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      setIsSaving(true)

      const response = await submit(message, name, messageType)
      if (response.status !== 201) {
        const jsonResponse = await response.json()
        throw new Error(jsonResponse.message ?? "Couldn't process your request")
      }

      // clear the form
      setMessage("")
      setName("")
      setMessageType(MessageType.public)

      showDialog(dialog)

      // get the latest messages
      const updatedMessages = await getGuestMessages()
      setMessages(updatedMessages)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col">
      <PageHeader title="/guest-book" />

      <form action="/api/guest-messages" method="post" onSubmit={submitForm} className="flex flex-col mb-2">
        <label htmlFor="name" className="mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          disabled={isSaving}
          className="mb-4 rounded-md p-2"
          required={true}
          maxLength={50}
        />

        <label htmlFor="message" className="mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Message"
          disabled={isSaving}
          className="rounded-md p-2 mb-4"
          required={true}
          maxLength={250}
        />

        <div
          className="flex-1 flex items-center space-x-2 mb-4"
          title="Your message will be sent via email instead of being shown below"
        >
          <input
            type="checkbox"
            name="type"
            id={MessageType.private}
            value={MessageType.private}
            checked={messageType === MessageType.private}
            onChange={(event) => {
              let type = event.target.value as MessageType

              // check the current selected type and toggle it
              if (messageType === MessageType.private) {
                type = MessageType.public
              }

              return setMessageType(type)
            }}
            className="hover:cursor-pointer"
          />
          <label htmlFor={MessageType.private} className="hover: cursor-pointer">
            Private message
          </label>
        </div>

        <button type="submit" disabled={isSaving} className="p-3 rounded-md font-semibold">
          Submit
        </button>
      </form>

      <dialog ref={dialog}>
        <div className="flex flex-col items-end">
          <h2>Your message has been sent!</h2>
          <button
            onClick={() => closeDialog(dialog)}
            className="mt-2 p-2 bg-transparent border-0 rounded-md text-foreground text-sm lg:text-base md:text-base"
          >
            Close
          </button>
        </div>
      </dialog>

      <hr className="my-6 w-full" />

      <h2 className="mb-3">Messages</h2>

      {messages.map((msg) => (
        <div key={msg.id} className="flex flex-row space-x-2">
          <p className="font-semibold text-sm">{msg.guestName}:</p>
          <p className="text-sm break-words overflow-hidden"> {msg.message}</p>
        </div>
      ))}
    </div>
  )
}

async function submit(message: string, name: string, type: MessageType): Promise<Response> {
  const form = new URLSearchParams()
  form.append("message", message)
  form.append("guestName", name)
  form.append("type", type)

  const response = await fetch("/api/guest-messages", {
    body: form,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  return response
}

function closeDialog(dialog: RefObject<HTMLDialogElement>) {
  dialog.current?.close()
}

function showDialog(dialog: RefObject<HTMLDialogElement>) {
  dialog.current?.showModal()
}
