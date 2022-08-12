import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCustumers1660332855575 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'custumers',
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
                        type:'varchar'
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
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("custumers")
    }

}
