export default function getCookieByName(name: string): string {
  const secure = process.env.NODE_ENV === "production" ? "Secure;" : ""
  return `sessionId=${name}; HttpOnly; Path=/; ${secure} SameSite=Strict; Max-Age=${60 * 60 * 24}`
}
