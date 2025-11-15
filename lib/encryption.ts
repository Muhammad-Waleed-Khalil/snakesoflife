/**
 * Client-side AES-256-GCM encryption module
 * All user content is encrypted before being sent to Firebase
 */

const ENCRYPTION_KEY_NAME = 'snakes_encryption_key';
const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;

/**
 * Generate a new encryption key and store it in localStorage
 */
export async function generateKey(): Promise<CryptoKey> {
  const key = await crypto.subtle.generateKey(
    {
      name: ALGORITHM,
      length: KEY_LENGTH,
    },
    true, // extractable
    ['encrypt', 'decrypt']
  );

  // Export and store the key
  const exportedKey = await crypto.subtle.exportKey('jwk', key);
  localStorage.setItem(ENCRYPTION_KEY_NAME, JSON.stringify(exportedKey));

  return key;
}

/**
 * Get the existing encryption key from localStorage or generate a new one
 */
export async function getKey(): Promise<CryptoKey> {
  const storedKey = localStorage.getItem(ENCRYPTION_KEY_NAME);

  if (storedKey) {
    try {
      const keyData = JSON.parse(storedKey);
      return await crypto.subtle.importKey(
        'jwk',
        keyData,
        {
          name: ALGORITHM,
          length: KEY_LENGTH,
        },
        true,
        ['encrypt', 'decrypt']
      );
    } catch (error) {
      console.error('Error importing stored key, generating new one:', error);
      return await generateKey();
    }
  }

  return await generateKey();
}

/**
 * Encrypt a text string
 * @param text - The plaintext to encrypt
 * @returns Base64-encoded encrypted string with IV prepended
 */
export async function encrypt(text: string): Promise<string> {
  if (!text) return '';

  try {
    const key = await getKey();
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    // Generate a random IV for each encryption
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encryptedData = await crypto.subtle.encrypt(
      {
        name: ALGORITHM,
        iv: iv,
      },
      key,
      data
    );

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encryptedData.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedData), iv.length);

    // Convert to base64
    return btoa(String.fromCharCode(...combined));
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypt an encrypted string
 * @param ciphertext - Base64-encoded encrypted string with IV prepended
 * @returns Decrypted plaintext
 */
export async function decrypt(ciphertext: string): Promise<string> {
  if (!ciphertext) return '';

  try {
    const key = await getKey();

    // Decode from base64
    const combined = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));

    // Extract IV and encrypted data
    const iv = combined.slice(0, 12);
    const encryptedData = combined.slice(12);

    const decryptedData = await crypto.subtle.decrypt(
      {
        name: ALGORITHM,
        iv: iv,
      },
      key,
      encryptedData
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  } catch (error) {
    console.error('Decryption error:', error);
    // Return a placeholder instead of throwing to handle corrupt data gracefully
    return '[Encrypted content - unable to decrypt]';
  }
}

/**
 * Check if encryption is available in the current environment
 */
export function isEncryptionAvailable(): boolean {
  return typeof window !== 'undefined' &&
         typeof crypto !== 'undefined' &&
         typeof crypto.subtle !== 'undefined';
}

/**
 * Encrypt an object by encrypting each string value
 */
export async function encryptObject<T extends Record<string, any>>(
  obj: T
): Promise<Record<string, any>> {
  const encrypted: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      encrypted[key] = await encrypt(value);
    } else {
      encrypted[key] = value;
    }
  }

  return encrypted;
}

/**
 * Decrypt an object by decrypting each string value
 */
export async function decryptObject<T extends Record<string, any>>(
  obj: Record<string, any>
): Promise<T> {
  const decrypted: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string' && value.length > 0) {
      try {
        decrypted[key] = await decrypt(value);
      } catch {
        decrypted[key] = value;
      }
    } else {
      decrypted[key] = value;
    }
  }

  return decrypted as T;
}
