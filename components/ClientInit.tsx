'use client';

import { useEffect } from 'react';
import { cleanupOldKeys } from '@/lib/encryption';

/**
 * Client-side initialization component
 * Runs cleanup and setup tasks on app load
 */
export default function ClientInit() {
  useEffect(() => {
    // Clean up old per-user encryption keys
    cleanupOldKeys();
  }, []);

  return null;
}
