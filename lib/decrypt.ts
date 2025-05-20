import crypto from 'crypto';

export function decryptEnvSecret(base64Encrypted: string, password: string): string {
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
};