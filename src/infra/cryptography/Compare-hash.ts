import bcrypt from 'bcryptjs';
import { IcompareHash } from '@/data/protocols/cryptography';



export class CompareHash implements IcompareHash{
  async compare(data: IcompareHash.Input): Promise<boolean>{
    const isValue = await bcrypt.compare(data.password, data.passwordhash);

    return isValue;
  }
}
