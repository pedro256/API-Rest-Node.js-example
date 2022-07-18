import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1656620962199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'products',
            columns:[
                {
                    name:'id',
                    type:'int',
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy: 'increment'
                },
                {
                    name:'name',
                    type:'varchar',
                    length: '255'
                },
                {
                    name:'description',
                    type:'varchar',
                    length:'255'
                },
                {
                    name:'price',
                    type:'decimal',
                    precision:10,
                    scale:2
                },
                {
                    name:'quantity',
                    type:'int',
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
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('products')
    }

}
