export const securityHeaderBaseline = {
  required: {
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'SAMEORIGIN',
  },

  knownMissing: [
    'content-security-policy',
    'referrer-policy',
    'permissions-policy',
  ],
} as const;