export default async function delay(duration: number) {
  return new Promise((resolve) => setTimeout(() => resolve(null), duration))
}
