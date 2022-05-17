export class Products {
    static async listProducts(){

        const response = await fetch("https://api-kenzie-food.herokuapp.com/products")
        const data     = await response.json()

        return data

    }

}