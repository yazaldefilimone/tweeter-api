import { randomUUID } from 'crypto';

export const generationUUID = function ({ isDomain }: { isDomain: boolean }) {
  if (isDomain) {
    return randomUUID();
  }
  return `tweeter-${randomUUID()}`;
};
