function formatPublicKey(key: string | null) {
  if (!key) return;
  return key?.substring(0, 4) + "..." + key?.substring(key.length - 4);
}

export { formatPublicKey };
