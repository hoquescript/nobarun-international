function formatText(text: string) {
  const fontSize = /font-size:\s?[a-zA-Z0-9(,.)#]*;?/g;
  const fontFamily = /\s?[a-zA-Z0-9-]*-?font-family:\s?\w*;?/g;
  const lineHeight = /line-height:\s?\w*.?\w*;?/g;
  const color = /color:\s?[a-zA-Z0-9(,.)#]*;?/g;
  return text
    ?.replace(fontSize, '')
    .replace(fontFamily, '')
    .replace(lineHeight, '')
    .replace(color, '');
}

export default formatText;
