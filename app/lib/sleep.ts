export async function sleep(secs: number = 1) {
  return await new Promise((resolve) => setTimeout(resolve, secs * 1000))
}
