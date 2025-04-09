function hybridEncode(text) {
    const encoded = [];
    for (let char of text) {
      if (char.charCodeAt(0) < 128) {
        encoded.push("1" + char.charCodeAt(0));
      } else {
        const utf8 = new TextEncoder().encode(char);
        encoded.push("2" + Array.from(utf8).join("-"));
      }
    }
    return encoded.join(" ");
  }
  
  function hybridDecode(text) {
    const tokens = text.trim().split(/\s+/);
    let decoded = "";
  
    for (let token of tokens) {
      if (token.startsWith("1")) {
        decoded += String.fromCharCode(parseInt(token.slice(1)));
      } else if (token.startsWith("2")) {
        const byteArray = token.slice(1).split("-").map(num => parseInt(num));
        decoded += new TextDecoder().decode(new Uint8Array(byteArray));
      }
    }
  
    return decoded;
  }
  
  function encodeText() {
    const input = document.getElementById("inputText").value;
    const output = hybridEncode(input);
    document.getElementById("outputText").value = output;
  }
  
  function decodeText() {
    const input = document.getElementById("inputText").value;
    const output = hybridDecode(input);
    document.getElementById("outputText").value = output;
  }
  