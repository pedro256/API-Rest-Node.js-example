import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCustumerIdToOrders1660358374700 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('orders',
        new TableColumn({
            name:'custumer_id',
            type:'int',
            isNullable:true,
        }))
        await queryRunner.createForeignKey('orders',
        new TableForeignKey({
            name:'orders-custumers',
            columnNames:['custumer_id'],
            referencedTableName:'custumers',
            referencedColumnNames:['id'],
            onDelete:"SET NULL"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders','orders-custumers');
        await queryRunner.dropColumn('orders','custumer_id');
    }

}
