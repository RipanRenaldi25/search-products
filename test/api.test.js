import app from "../app.js";
import supertest from "supertest";
describe("Endpoint /products", ()=>{
    test("Should Return Status Code 200", async ()=>{
        const response = await supertest(app).get('/products')
        expect(response.statusCode).toBe(200);
    })
    test('Should Contain JSON on Return Content-Type Header', async () => {
        const response = await supertest(app).get('/products')
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    })
});
