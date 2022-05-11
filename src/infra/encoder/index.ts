import { IEncoder } from '@/data/contracts/encoder';

import bcrypt from 'bcryptjs';

export class Encoder implements IEncoder {
  async encode(value: string, salt = 8): Promise<string> {
    const hash = await bcrypt.hash(value, salt);
    return hash;
  }

  async decode(value: string, valueHash: string): Promise<boolean> {
    const hash = await bcrypt.compare(value, valueHash);
    return hash;
  }
}
