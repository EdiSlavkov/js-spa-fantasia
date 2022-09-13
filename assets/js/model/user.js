let user = (function(){
    class User {

        constructor(){
            this.ordered = [];
        }
    
        add(product){
            if(this.ordered.indexOf(product) === -1){
                this.ordered.push(product);
            }
        }
    
        remove(product){
            if(this.ordered.indexOf(product) !== -1){
                this.ordered.splice(this.ordered.indexOf(product),1);
            }
        }
    }
    return new User();
})();