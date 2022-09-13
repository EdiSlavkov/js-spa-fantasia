let productManager = (function(){

    class Product {

        constructor(image, name, weight, category, price){
            this.image = image,
            this.name = name,
            this.weight = weight,
            this.category = category,
            this.price = price,
            this.number = 0;
        }
    }

    class ProductManager {

        constructor(){
            this.products = [];
        }
    
        add(image, name, weight, category, price){
            if(!(this.products.some(product => product.name === name))){
                this.products.push(new Product(image, name, weight, category, price));
            }
        }
    
        filterByText(text){
            let filter = [];
            for(let i = 0; i < this.products.length; i++){
                if(this.products[i].name.toLowerCase().includes(text.toLowerCase())){
                    filter.push(this.products[i])
                }
            }
            return filter;
        }
    
    }
    return new ProductManager();
})()