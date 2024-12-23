"use client"

import sendGuestMessage from "@/app/lib/actions/send_guest_message.actions"
import { MessageType } from "@/app/lib/enums/message_type.enums"
import logError from "@/app/lib/utils/error_logger.utils"
import { FormEvent, RefObject, useRef, useState } from "react"

export default function GuestMessageForm() {
  // form data
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")

  const [isSaving, setIsSaving] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    setIsSaving(true)

    try {
      event.preventDefault()

      const formData = new FormData(event.currentTarget)
      await sendGuestMessage(formData)

      // clear the form
      setMessage("")
      setName("")
      showDialog(dialog)
    } catch (err) {
      logError(err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <form onSubmit={submitForm} className="flex flex-col mb-2">
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
          <input type="checkbox" name="type" id={MessageType.private} className="hover:cursor-pointer" />
          <label htmlFor={MessageType.private} className="hover: cursor-pointer">
            Private message
          </label>
        </div>

        <button type="submit" disabled={isSaving} className="p-3 rounded-md font-semibold">
          {isSaving ? "Submitting.." : "Submit"}
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
    </>
  )
}

function closeDialog(dialog: RefObject<HTMLDialogElement>) {
  dialog.current?.close()
}

function showDialog(dialog: RefObject<HTMLDialogElement>) {
  dialog.current?.showModal()
}
