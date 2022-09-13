let userManager = (function(){
    class CreateUser {
    
        constructor(email, username, password){
            this.email = email,
            this.username = username,
            this.password = password;
            this.history = [];   
        }
    }
    
    class UserManager {
    
        constructor(){

            if(localStorage.getItem("fantasiausers") === null ){
                localStorage.setItem("fantasialogin", JSON.stringify([]));
                localStorage.setItem("fantasiausers", JSON.stringify([]));
            }

            this.users = JSON.parse(localStorage.fantasiausers);
            this.logIn = JSON.parse(localStorage.fantasialogin);
            
        }
    
        createUser(email, username, password){
            if(!this.checkUsername(username) && !this.checkEmail(email)){
                this.users.push(new CreateUser(email, username, password));
                localStorage.setItem("fantasiausers", JSON.stringify(this.users));
            }
        }
    
        checkUsername(username){
            return this.users.some(user => user.username === username);
        }
    
        checkEmail(email){
            return this.users.some(user => user.email === email);
        }
    
        checkLoginValue(email, password){
            return this.users.some(e => e.email === email && e.password === password);
        }
    
        getUserName(email){
            let obj = this.logIn.filter(e => e.email === email);
            return obj[0].username;
        }
    
        userLogIn(email){
            let user = this.users.filter(e => e.email === email);
            let isLogged = this.logIn.some(e => e.email === email);
            if(!isLogged){
                this.logIn.push(user[0]);
                localStorage.setItem("fantasialogin", JSON.stringify(this.logIn));
            }
        }

        userLogOut(){
            this.logIn.pop();
            localStorage.setItem("fantasialogin", JSON.stringify([]));
        }

        addHistory(order){
            this.logIn[0].history.push(order);
            localStorage.setItem("fantasialogin", JSON.stringify(this.logIn))
            let user = this.users.filter(e => e.email === this.logIn[0].email);
            user.history = this.logIn[0].history;
            localStorage.setItem("fantasiausers", JSON.stringify(this.users));
        }

        getHistory(){
            return this.logIn[0].history;
        }
    }

    return new UserManager();
})()