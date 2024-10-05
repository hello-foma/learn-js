import { App } from '../app';

const app = new App();

test('App login should return true for found user', () => {
    expect(app.login('albus')).toBe(true);
});