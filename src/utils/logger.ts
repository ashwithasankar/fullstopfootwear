/**
 * Lightweight development logger.
 * Only logs detailed info in development environment.
 */

const isDev = Boolean((import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV ?? true);

export const logger = {
  info: (event: string, details?: Record<string, unknown> | string | number) => {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.log(`%c[FULLSTOP SHOE MALL] %c${event}`, 'color: #C8A96B; font-weight: bold;', 'color: inherit;', details ?? '');
    }
  },
  warn: (event: string, details?: unknown) => {
    // eslint-disable-next-line no-console
    console.warn(`[FULLSTOP SHOE MALL WARN] ${event}`, details ?? '');
  },
  error: (event: string, error?: unknown) => {
    // eslint-disable-next-line no-console
    console.error(`[FULLSTOP SHOE MALL ERROR] ${event}`, error ?? '');
  },
};
