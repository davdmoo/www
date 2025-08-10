import DictionaryProject from "@/app/ui/projects/dictionary.pages"
import FinanceTrackerProject from "@/app/ui/projects/finance_tracker.pages"
import InvoiceManagementProject from "@/app/ui/projects/invoice_management.pages"
import SlinksProject from "@/app/ui/projects/slinks.pages"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Projects",
}

export default async function ProjectSlug({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  switch (slug) {
    case "slinks":
      return <SlinksProject />
    case "invoice-management":
      return <InvoiceManagementProject />
    case "dictionary":
      return <DictionaryProject />
    case "finance-tracker":
      return <FinanceTrackerProject />
    default:
      redirect("/projects")
  }
}
