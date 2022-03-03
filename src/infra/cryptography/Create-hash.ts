import { IcreateHash } from '@/data/protocols/cryptography';
import bcrypt from 'bcryptjs'

export class CreateHash implements IcreateHash{
  public encrypt;
  constructor() { this.encrypt = bcrypt }
  async create(data: IcreateHash.Input, salt = 10): Promise<string>{
    const passwordhash = await this.encrypt.hash(data.password, salt);
    return passwordhash;
  }
}
