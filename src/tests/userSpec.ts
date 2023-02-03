import { User, UserStore } from '../models/user';

const store = new UserStore();
const user: User = {
    username: 'test_user',
    password: 'test_password'
}
describe('User Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a login method', () => {
        expect(store.login).toBeDefined();
    });
});

describe('User Model', () => {
    it('should return a result with length equal 2 as default samples and supertest end point sample', async () => {
        const result = await store.index();
        expect(result.length).toBe(2)
    })
    it('should return a result with a username=waris after default samples', async () => {
        const result = await store.show('waris');
        expect(result.username).toBe('waris')
    })
    it('should return result with length=3 after creating a new user and previous test datas', async () => {
        await store.create(user)
        const result = await store.index()
        expect(result.length).toBe(3)
    })
    it('should login successfully', async () => {
        const user: User = {
            username: 'test_user',
            password: 'test_password'
        }
        const result = await store.login(user)
        expect(result).not.toBeNull()
    })
})
