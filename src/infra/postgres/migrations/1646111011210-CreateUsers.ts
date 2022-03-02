import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1646111011210 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'users',
            columns: [
                {
                    name:'id',
                    type:'uuid',
                    isPrimary:true,
                    isUnique:true,
                    isNullable:true,
                },
                {
                    name:'name',
                    type:'varchar',
                    isUnique:false
                },
                {
                    name:'username',
                    type:'varchar',
                    isUnique:true,
                    isNullable:true
                },
                {
                    name:'bio',
                    type:'varchar',
                    isUnique:false
                },
                {
                    name:'email',
                    type:'varchar',
                    isUnique:true,
                    isNullable:true
                },
                {
                    name:'password',
                    type:'varchar',
                    isNullable:true
                },
                {
                    name:'born',
                    type:'varchar',
                    isUnique:false,
                    isNullable:true
                },
                {
                    name:'created_at',
                    type:'varchar',
                    isUnique:false,
                    isNullable:true
                }
            ]
        }))
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
