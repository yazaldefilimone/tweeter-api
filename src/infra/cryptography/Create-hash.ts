import { IcreateHash } from '@/data/protocols/cryptography';
import bcrypt from 'bcryptjs'

export class CreateHash implements IcreateHash{
  async create(data: IcreateHash.Input, salt = 10): Promise<string>{
    const passwordhash = await bcrypt.hash(data.password, salt);
    return passwordhash;
  }
}
