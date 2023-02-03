import { Product, ProductStore } from '../models/product';

const store = new ProductStore();
const product: Product = {
    name: 'new_product',
    price: 200
}

describe('Product Functions', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    // it('should have a delete method', () => {
    //     expect(store.delete).toBeDefined();
    // });
});

describe('Product Model', () => {
    it('should return a result with length equal 1, after default samples', async () => {
        const result = await store.index();
        expect(result.length).toBe(1)
    })
    it('should return a result with a product name test_product', async () => {
        const result = await store.show('1');
        expect(result.name).toBe('test_product')
    })
    it('should return result with length=2 after creating a new product', async () => {
        await store.create(product)
        const result = await store.index()
        expect(result.length).toBe(2)
    })
    // it('should delete an item successfully by checking the length afte delete action', async () => {
    //     await store.delete('1')
    //     const result = await store.index()
    //     expect(result.length).toBe(1)
    // })
})
