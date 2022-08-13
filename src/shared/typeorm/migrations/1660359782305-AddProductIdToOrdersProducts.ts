import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddProductIdToOrdersProducts1660359782305 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('orders-products',
        new TableColumn({
            name:'product_id',
            type:'int',
            isNullable:true,
        }))
        await queryRunner.createForeignKey('orders-products',
        new TableForeignKey({
            name:'orders-products-product',
            columnNames:['product_id'],
            referencedTableName:'products',
            referencedColumnNames:['id'],
            onDelete:"SET NULL"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders-products','orders-products-product');
        await queryRunner.dropColumn('orders-products','product_id');
    }
}
