import BackButton from "../back_button.components"
import ArrowLeftIcon from "../icons/arrow_left.components"
import ProjectsLayout from "./project_layout.components"

export default function InvoiceManagementProject() {
  return (
    <ProjectsLayout>
      <div className="w-full flex flex-row items-center gap-4 mb-4">
        <BackButton>
          <ArrowLeftIcon />
        </BackButton>
        <h2 className="mb-0">Invoice Management App</h2>
      </div>

      <p>
        This was a Windows application I built using Flutter and Typescript. Features include authentication, sales and
        product shipments&apos; invoice generation, along with sales data, customer, product, and stock management, and
        automated monthly reports.
      </p>
      <p>
        The most challenging part of this one was that this was my first experience handling a freelance project. I had
        to consult directly with the client, mapping business into project requirements, managing project timelines, and
        programming the actual software.
      </p>
      <p>
        Fortunately, I have experience in managing and splitting tasks at work using GitHub Projects. This I did since I
        had found myself being constantly overwhelmed by unclear requirements and tasks.
      </p>
      <p>
        The second most challenging part was printing hard copied invoices using dot matrix printers - of which I had no
        experience doing. In the end, what I did was generating the invoice as HTML on the server, converting it into
        PDF, and then sending a PowerShell command to print using the default PDF reader.
      </p>
      <p>
        All in all, I learned a lot in managing project timelines, creating and managing database backups, re-learned
        database migrations, and, of course, time management, since I had to work on the project outside of working
        hours.
      </p>

      <p>
        A Windows-based application built using Flutter on the frontend, and Typescript/Cloud Functions/MongoDB on the
        backend.
      </p>

      <picture>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/semar-im.appspot.com/o/Screenshot%20from%202025-08-10%2014-29-45.png?alt=media&token=312c5053-43ec-4744-b4f8-554cf5008838"
          alt="Create an invoice screenshot"
          className="my-4"
        ></img>
      </picture>
      <picture>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/semar-im.appspot.com/o/Screenshot%20from%202025-08-10%2014-35-28.png?alt=media&token=a9ad1fcf-b24a-4972-8a68-51f795ed5a2c"
          alt="Invoice detail screenshot"
        ></img>
      </picture>
    </ProjectsLayout>
  )
}
