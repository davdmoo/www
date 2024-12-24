import GuestMessageForm from "@/app/ui/guest_book/guest_message_form.components"
import GuestMessageList from "@/app/ui/guest_book/guest_message_list.components"
import PageHeader from "@/app/ui/page_header.components"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Guest Book",
}

export default function GuestBookPage() {
  return (
    <div className="flex flex-col">
      <PageHeader title="/guest-book" />
      <GuestMessageForm />
      <hr className="my-6 w-full" />
      <Suspense fallback={<p>Loading messages..</p>}>
        <GuestMessageList />
      </Suspense>
    </div>
  )
}
