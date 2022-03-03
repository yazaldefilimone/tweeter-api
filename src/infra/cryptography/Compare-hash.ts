import bcrypt from 'bcryptjs';
import { IcompareHash } from '@/data/protocols/cryptography';



export class CompareHash implements IcompareHash{
  public encrypt;
  constructor() { this.encrypt = bcrypt }

  async compare(data: IcompareHash.Input): Promise<boolean>{
    const isValue = await this.encrypt.compare(data.password, data.passwordhash);
    return isValue;
  }
}
