import GuestMessage from "@/app/lib/models/guest_message.models"
import BasicResponse from "@/app/lib/types/basic_response.types"

export default async function getGuestMessages(): Promise<GuestMessage[]> {
  const response = await fetch("/api/guest-messages")
  const json = (await response.json()) as BasicResponse<GuestMessage>
  if (json.data == null) throw new Error(json.message)

  const guestMessages = json.data as GuestMessage[]
  return guestMessages
}
