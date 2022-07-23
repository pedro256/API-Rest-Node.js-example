import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTable1658369274400 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'users',
                columns: [
                    {
                        name:'id',
                        type:'int',
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy: 'increment'
                    },
                    {
                        name:'firstName',
                        type:'varchar'
                    },
                    {
                        name:'secondName',
                        type:'varchar'
                    },
                    {
                        name:'email',
                        type:'varchar',
                        isUnique:true
                    },
                    {
                        name:'password',
                        type:'varchar'
                    },
                    {
                        name:'avatar',
                        type:'varchar',
                        isNullable:true
                    },
                    {
                        name:'created_at',
                        type:'timestamp with time zone',
                        default:'now()',
    
                    },
                    {
                        name:'updated_at',
                        type:'timestamp with time zone',
                        default:'now()',
    
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
