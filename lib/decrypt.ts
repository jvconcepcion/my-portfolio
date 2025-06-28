import { Buffer } from 'buffer';

// Type guard for Node.js crypto
function isNodeCrypto(crypto: any): crypto is typeof import('crypto') {
  return typeof crypto?.scryptSync === 'function';
}

/**
 * Universal decryption function
 * - Uses Node.js `crypto` on the server
 * - Falls back to Web Crypto API in the browser
 */
export async function decrypt(
  base64Encrypted: string,
  password: string
): Promise<string> {
  // Server-side (Node.js)
  if (typeof window === 'undefined') {
    const crypto = await import('crypto');
    return decryptEnvSecret(base64Encrypted, password, crypto);
  }
  // Client-side (Browser)
  else {
    return browserDecrypt(base64Encrypted, password);
  }
}

// Server-only decryption (Node.js crypto)
function decryptEnvSecret(
  base64Encrypted: string,
  password: string,
  crypto: typeof import('crypto')
): string {
  const { iv, content } = JSON.parse(
    Buffer.from(base64Encrypted, 'base64').toString('utf8')
  );

  const key = crypto.scryptSync(password, 'salt', 32);
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    key,
    Buffer.from(iv, 'hex')
  );

  let decrypted = decipher.update(content, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Browser decryption (Web Crypto API)
async function browserDecrypt(
  base64Encrypted: string,
  password: string
): Promise<string> {
  const { iv, content } = JSON.parse(
    Buffer.from(base64Encrypted, 'base64').toString('utf8')
  );

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new TextEncoder().encode('salt'),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-CBC', length: 256 },
    false,
    ['decrypt']
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-CBC', iv: new TextEncoder().encode(iv) },
    key,
    Buffer.from(content, 'hex')
  );

  return new TextDecoder().decode(decrypted);
}