export const formatText = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/~~(.*?)~~/g, '<s>$1</s>')
    .replace(/\n/g, '<br>')
}

export const applyFormat = (
  message: string,
  symbol: string,
  start: number,
  end: number
): { text: string; cursorStart: number; cursorEnd: number } => {
  const selectedText = message.substring(start, end)
  
  if (selectedText) {
    return {
      text: message.substring(0, start) + symbol + selectedText + symbol + message.substring(end),
      cursorStart: start + symbol.length,
      cursorEnd: end + symbol.length
    }
  } else {
    return {
      text: message.substring(0, start) + symbol + symbol + message.substring(end),
      cursorStart: start + symbol.length,
      cursorEnd: start + symbol.length
    }
  }
}
