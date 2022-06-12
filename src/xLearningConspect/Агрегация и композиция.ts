/*
предварительно - КОМПОЗИЦИЯ это когда в классе(автомобиль) используются объекты(двигатель, колеса) причем эти объекты не используются нигде кроме этого класса
  а АГРЕГАЦИЯ это когда класс использует некий объект который не зависит от этого класса
 */

class Engine1 {
  drive(){
    console.log('engin worked')
  }
}

class Wheel {
  drive() {
    console.log('wheels run')
  }
}

class Freshener {

}

class Car1 {
  engine: Engine1;
  wheels: Wheel[];
  freshener: Freshener;

//сам экземпляр класса создается гдето вне
  constructor(freshener) {
    //Агрегация
    this.freshener = freshener;
    //Композиция
    this.engine = new Engine1()
    this.wheels.push(new Wheel())
    this.wheels.push(new Wheel())
    this.wheels.push(new Wheel())
    this.wheels.push(new Wheel())
  }
  //Делегирование
  drive() {
    this.engine.drive();
    for (let i = 0; i < this.wheels.length; i++) {
      this.wheels[i].drive()
    }
  }
}

/*
кроч суть в том что объект агрегированный классу останется при удалении класса, а композиция которая создана в классе будет удалена вместе с ним
 */