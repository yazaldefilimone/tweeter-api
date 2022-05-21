import { v4 } from 'uuid';

export const generationUUID = function (isDomain = false) {
  if (isDomain) {
    return v4();
  }
  return `tweeter-${v4()}`;
};
