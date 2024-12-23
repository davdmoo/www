export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col text-center w-full">
      <h1 className="text-4xl font-bold">{title}</h1>
      <hr className="my-4 w-full" />
    </div>
  )
}
