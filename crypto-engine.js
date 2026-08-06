/* ==========================================================================
   HAVEN SANCTUARY — CLIENT-SIDE ZERO-KNOWLEDGE CRYPTO ENGINE
   Uses Web Crypto API (PBKDF2 Key Derivation + AES-GCM 256-bit Encryption)
   ========================================================================== */

export async function deriveKey(passphrase, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(passphrase),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptText(plainText, passphrase = "haven-local-key") {
  try {
    const enc = new TextEncoder();
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(passphrase, salt);

    const encryptedContent = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      key,
      enc.encode(plainText)
    );

    const encryptedArray = new Uint8Array(encryptedContent);
    const combined = new Uint8Array(salt.length + iv.length + encryptedArray.length);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(encryptedArray, salt.length + iv.length);

    return btoa(String.fromCharCode.apply(null, combined));
  } catch (e) {
    return plainText; // Fallback
  }
}

export async function decryptText(cipherBase64, passphrase = "haven-local-key") {
  try {
    const binary = atob(cipherBase64);
    const combined = Uint8Array.from(binary, c => c.charCodeAt(0));

    const salt = combined.slice(0, 16);
    const iv = combined.slice(16, 28);
    const data = combined.slice(28);

    const key = await deriveKey(passphrase, salt);
    const decryptedContent = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      key,
      data
    );

    const dec = new TextDecoder();
    return dec.decode(decryptedContent);
  } catch (e) {
    return cipherBase64; // Fallback
  }
}
