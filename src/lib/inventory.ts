import { prisma } from './prisma';
import { sendAdminAlert } from './sms';

export type CartProduct = {
    productId: string;
    quantity: number;
    title?: string;
    price?: number;
};

export async function decrementStockAndAlert(products: CartProduct[]): Promise<void> {
    for (const item of products) {
        const product = await prisma.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
            select: { title: true, stock: true },
        });

        if (product.stock < 10) {
            await sendAdminAlert('low_stock', { productName: product.title, stock: product.stock });
        }
        if (product.stock === 0) {
            await sendAdminAlert('out_of_stock', { productName: product.title, stock: product.stock });
        }
    }
}

export async function restoreStock(products: CartProduct[]): Promise<void> {
    for (const item of products) {
        await prisma.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
        });
    }
}

