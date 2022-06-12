/*

Один класс может рашитрять другой, или иначе класс может наследовать другой класс
при этом он унаследует его свойства и методы

Хорошо спроектированная ООП система позволяет очень эффективно ПЕРЕИСПОЛЬЗОВАТЬ код
МАСШТАБИРОВАТЬ и поддерживать его благодаря механизму наследования

А еще кст родительские методы можно переопределять
 */

class Person {
  private _firstName;
  private _lastName;
  private _age;

  constructor(firstName, lastName, age) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._age = age;
  }

  public get fullName(){
    return `Фамилия - ${this.lastName} Имя - ${this._firstName}`
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(value) {
    this._firstName = value;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(value) {
    this._lastName = value;
  }

  get age() {
    return this._age;
  }

  set age(value) {
    if (value < 0){
      this._age = 0;
    }else{
      this._age = value;
    }
  }
}


// В данном случае класс работник наследуется от класса человек
//И получает все его свойства и методы
// extends - позволяет наследоваться только от 1 класса
class Employee1 extends Person{

}

//даже несмотря на то что класс работник не содержит ничего, мы все же можем создать его объект и будем обязаны передать
// пареметры классу от которого он наследуется
const employee1 = new Employee1('Вася', 'Пупкин', 20)

class Employee extends Person{
  private inn;
  private number;
  private snils;

  //Дочерний конструктор должен принимать все то что принимал ролдительский + то что требуется уже в текущем классе
  constructor(firstName, lastName, age, inn, number, snils) {
    // Метод - super говорит о том что в первую очередь будет вызван родительский конструктор
    super(firstName, lastName, age);
    this.inn = inn;
    this.number = number;
    this.snils = snils;
  }
}

const emloyee2 = new Employee('Вася','Пупкин',15,1545564,74556156,465445)

class Developer extends Employee {
  private level;

  constructor(firstName, lastName, age, inn, number, snils, level) {
    super(firstName, lastName, age, inn, number, snils);
    this.level = level;
  }
}

const developer = new Developer('Вася','Пупкин',15,1545564,74556156,465445,'Junior')

console.log(developer.fullName);