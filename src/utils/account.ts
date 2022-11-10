function formatPublicKey(key: string | null) {
  if (!key) return;
  return key?.substring(0, 6) + "..." + key?.substring(key.length - 6);
}

export { formatPublicKey };
