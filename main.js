"use strict";
/**
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 * @throws {HamburgerException}  При неправильном использовании
 */



class Hamburger{
    constructor(size, stuffing) {
        try {
            if (arguments.length !== 2) {
                throw new HamburgerException("Sorry but you must enter only two arguments: size, and stuffing");
            }
            if (size !== Hamburger.SIZE_SMALL && size !== Hamburger.SIZE_LARGE) {
                throw new HamburgerException("Sorry but now only small size available");
            }
            if (stuffing !== Hamburger.STUFFING_CHEESE && stuffing !== Hamburger.STUFFING_SALAD && stuffing !== Hamburger.STUFFING_POTATO) {
                throw new HamburgerException("Please enter correct stuffing:CHEESE, SALAD,or  POTATO");
            }
            this._size = size;
            this._stuffing = stuffing;
            this._topping = [];
        } catch (e) {
            console.log(e.message);
        }
    }
    addTopping(topping){
        try{
            if(!topping && arguments.length!==1){
                throw new HamburgerException('Please enter the topping');
            }if(topping!==Hamburger.TOPPING_SPICE && topping!==Hamburger.TOPPING_MAYO){
                throw new HamburgerException('Sorry there is no such topping');
            }

            if(this._topping.includes(topping)){
                throw new HamburgerException('Sorry your hamburger already includes this topping, you can add another');
            }
            else{
                this._topping.push(topping)
            }

        }catch(e){
            console.log(e.message);
        }

    };
    removeTopping(topping){
        try{
            if(!topping && arguments.length!==1){
                throw new HamburgerException('Please enter the topping');
            }if(topping!==Hamburger.TOPPING_SPICE && topping!==Hamburger.TOPPING_MAYO){
                throw new HamburgerException('Sorry there is no such topping');
            }

            if(this._topping.includes(topping)){
                this._topping.splice(this._topping.indexOf(topping,1))
            }
        }catch(e){
            console.log(e.message);
        }
    };
    get toppings (){
        let arr=[];
        for(let topping of this._topping){
            arr.push(topping.calories);
        }
        return arr
    };

    get size(){
        return this._size.size
    };
    get stuffing(){
        return this._stuffing._stuffing
    };

    calculatePrice(){
        let priceCount=0;
        for(let key in this){
            if(this[key].hasOwnProperty('price')){
                priceCount+=this[key].price
            }
        }
        for(let topping of this._topping){
            priceCount+=topping.price;
        }
        return priceCount;
    };

    calculateCalories(){
        let caloriesCount=0;
        for(let key in this){
            if(this[key].hasOwnProperty('calories')){
                caloriesCount+=this[key].calories
            }
        }
        for(let topping of this._topping){
            caloriesCount+=topping.calories;
        }
        return  caloriesCount;
    };

}


/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = {price:50, calories:20, size:"small"};
Hamburger.SIZE_LARGE = {price:100, calories:40, size:"large"};
Hamburger.STUFFING_CHEESE ={price:10, calories:20, stuffing:"cheese"};
Hamburger.STUFFING_SALAD ={price:20, calories:5, stuffing:"salad"};
Hamburger.STUFFING_POTATO ={price:15, calories:10, stuffing:"potato"};
Hamburger.TOPPING_MAYO ={price:20, calories:5, topping:'mayo'};
Hamburger.TOPPING_SPICE ={price:15, calories:0, topping:'spice'};


class HamburgerException extends Error{
    constructor(message){
        super(message)
        this.message=message;
        this.name='HamburgerException';
    }

}



// маленький гамбургер с начинкой из сыра
let hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_SALAD);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// // спросим сколько там калорий
console.log("Calories: %f", hamburger.calculateCalories());
// // сколько стоит
console.log("Price: %f", hamburger.calculatePrice());
// // я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);
// // А сколько теперь стоит?
console.log("Price with sauce: %f", hamburger.calculatePrice());
// // Проверить, большой ли гамбургер?
console.log("Is hamburger large: %s", hamburger.size === Hamburger.SIZE_LARGE); // -> false
// // Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log("Have %d toppings", hamburger.toppings.length); // 1
console.log(hamburger);