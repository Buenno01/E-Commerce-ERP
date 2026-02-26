function encode(id: string) {
  return Buffer.from(id).toString("base64");
}

function decode(id: string) {
  return Buffer.from(id, "base64").toString();
}

export { encode, decode };
