import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User{
  @PrimaryColumn()
  id:string;

  @Column()
  name:string;

  @Column()
  email:string;

  @Column()
  bio:string;

  @Column()
  password:string;

  @Column()
  born:string;

  @Column()
  username:string;

  @Column()
  created_at:string;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}
