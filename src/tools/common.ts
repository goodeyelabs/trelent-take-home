export function formatDate(input: string) {
  const options: object = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }

  const epoch = parseInt(input)
  const d = new Date(epoch * 1000).toLocaleDateString('en-US', options)
  const t = new Date(epoch * 1000).toLocaleTimeString('en-US')
  return t + ' ' + d
}

export function orderSessionsByCreateDate(sessions: any) {
  let output: object[] = []

  Object.keys(sessions).map((val: string, idx: number, ary: string[]) => {
    return output.push(sessions[idx])
  })
  output = output.reverse()

  return output
}

export function getSessionMessages(session: any) {
  let output: object[] = []

  Object.keys(session).map((val: string, idx: number, ary: string[]) => {
    return output.push(session[idx])
  })

  return output
}