import bcrypt from 'bcryptjs'
import { IcreateHash } from '@/data/protocols/cryptography'

export class CreateHashMock implements IcreateHash{
  count = 0
 async create(data: IcreateHash.Input, salt=10): Promise<string>{
   this.count++
   const hash = await  bcrypt.hash(data.password, salt);
   return hash
  }
}
