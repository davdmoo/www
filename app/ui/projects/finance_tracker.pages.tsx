import BackButton from "../back_button.components"
import ArrowLeftIcon from "../icons/arrow_left.components"
import ProjectsLayout from "./project_layout.components"

export default function FinanceTrackerProject() {
  return (
    <ProjectsLayout>
      <div className="w-full flex flex-row items-center justify-between mb-4">
        <div className="w-full flex flex-row items-center gap-4">
          <BackButton>
            <ArrowLeftIcon />
          </BackButton>
          <h2 className="mb-0">Finance Tracker App</h2>
        </div>
      </div>

      <p>
        I wanted a simple way to track my finances, so I built this fully-offline app using Flutter and SQLite. Features
        include income and expense tracking, budget management, data backup and imports, and financial reports.
      </p>

      <div className="flex flex-row w-full gap-4 my-4">
        <picture>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/semar-im.appspot.com/o/Screenshots%2FScreenshot_20250810_221144.jpg?alt=media&token=6cc3e803-5325-4984-b88f-f6ac90305267"
            alt="Finance tracker screenshot - list of transactions"
          />
        </picture>

        <picture>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/semar-im.appspot.com/o/Screenshots%2FScreenshot_20250810_221210.jpg?alt=media&token=7540096c-83b5-404f-a2af-17836a8e1178"
            alt="Finance tracker screenshot - settings page"
          />
        </picture>
      </div>
    </ProjectsLayout>
  )
}
