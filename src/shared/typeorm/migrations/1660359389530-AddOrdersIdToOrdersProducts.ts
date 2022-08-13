import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddOrdersIdToOrdersProducts1660359389530 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('orders-products',
        new TableColumn({
            name:'order_id',
            type:'int',
            isNullable:true,
        }))
        await queryRunner.createForeignKey('orders-products',
        new TableForeignKey({
            name:'orders-products-order',
            columnNames:['order_id'],
            referencedTableName:'orders',
            referencedColumnNames:['id'],
            onDelete:"SET NULL"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders-products','orders-products-order');
        await queryRunner.dropColumn('orders-products','order_id');
    }
}
