export default interface BasicResponse<T> {
  message: string
  data: T | T[] | null
}
