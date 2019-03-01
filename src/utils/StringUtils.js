export const formatString = (string, numlines) => {
  if (string) {
    let length = string.length;
    let paraLength = Math.round(length / numlines);
    let paragraphs = [];
    for (let i = 0; i < numlines; i++) {
      let marker = paraLength;
      //if the marker is right after a space, move marker back one character
      if (string.charAt(marker - 1) === ' ') {
        marker--;
      }
      //move marker to end of a word if it's in the middle
      while (string.charAt(marker) !== ' ' && string.charAt(marker) !== '') {
        marker++;
      }
      let nextPara = string.substring(0, marker);
      paragraphs.push(nextPara);
      string = string.substring(nextPara.length + 1, string.length);
    }
    return paragraphs;
  }
};
