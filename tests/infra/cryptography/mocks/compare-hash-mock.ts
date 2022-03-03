import bcrypt from 'bcryptjs'
import { IcompareHash } from '@/data/protocols/cryptography'

export class CompareHashSpy implements IcompareHash{
  count = 0;
  async compare(data: IcompareHash.Input): Promise<boolean>{
    this.count++
    const result = await bcrypt.compare(data.password, data.passwordhash);
    return result;
  }
}
