/*
Есть 2 типа полиморфизма это - параметрический и ad-hoc

Параметрический - истинный

ad-hoc - мнимый. Метод вроде как и один и работает с разными типами данных но требуется перегрузка данных
  так же ad-hoc полиморфизмом считается приведение типов, это когда явно какой то дочерний класс например приобразовываем\
  к родительскому
    Перегрузка — это разновидность специального полиморфизма. Такой вид полиморфизма позволяет объявлять функции с одним и
    тем же именем, но с разными типами аргументов и их количеством (арностью). Говоря другими словами, у функции может быть несколько сигнатур.

Полиморфизм - (поли - много, морф - форма) в контексте ООП полиморфизм можно воспринимать как некоторый принцип который позволяет
 одному и тому же фрагменту кода работать с разными типами данных

 */

// ad-hoc
/*
class Calculator {

//Есть 2 метода, оба метода одинаковые но принмают данные разных типов
//это возможно благодаря перегрузке данных
  add(a: number, b: number): number {
    return a + b
  }

  add(a: string, b: string): string {
    return a + b
  }
}

add(5,5)
// result -> 10
add("5","5")
// result -> "55"
*/


/*
Для демонстрации поставлена задача реализовать такую функцию которая сможет принимать в себя неограниченное количество
  объектов унаследованных от главного родительского класса
 */

class Person1 {
  private _firstName;
  private _lastName;
  private _age;

  constructor(firstName, lastName, age) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._age = age;
  }

  //Простой метод приветствия
  public greeting() {
    console.log(`Привет я человек и зовут меня ${this.firstName}`)
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

class Employee2 extends Person1{
  private inn;
  private number;
  private snils;

  constructor(firstName, lastName, age, inn, number, snils) {
    super(firstName, lastName, age);
    this.inn = inn;
    this.number = number;
    this.snils = snils;
  }
  //Простой метод приветствия который мы переопределили у родительского класса
  public greeting() {
    console.log(`Привет я работник и зовут меня ${this.firstName}`)
  }
}

class Developer1 extends Employee2 {
  private level;

  constructor(firstName, lastName, age, inn, number, snils, level) {
    super(firstName, lastName, age, inn, number, snils);
    this.level = level;
  }
  //Простой метод приветствия который мы переопределили у родительского класса
  public greeting() {
    console.log(`Привет я работник и зовут меня ${this.firstName}`)
  }
}

const developer2 = new Developer1('Вася','Пупкин',15,1545564,74556156,465445,'Junior')
const employee = new Employee2('Иван','Иванов',14,234234523,123412,124124,)
const person = new Person1('Петя','Петров',16)

//Создаем массив всех челико и указывем его тип как массив типа корневого класса
const personList: Person1[] = [developer2,employee,person]

//Создаем функцию массового приветствия которая аргументом принимает массив ТИПА person1
function massGreeting(persons: Person1[]){
  //просто проходимся по массиву persons и вызываем у каждого метод greeting
  for (let i = 0; i < persons.length; i++) {
    const person = persons[i]
    person.greeting()
  }
}
/* ну крч суть в том что несмотря на то что мы в этой функции не юзали дочерние классы
    методы greeting отработали в каждой из них, это и называют полиморфизмом
    мы работаем с объектами у которых есть метод который называется одинаково но работает по разному

    Крч допустим у тя есть куча объектов там например товар, характеристика товара, категория товара и т.д. ты создал все эти объекты
    и хочешь за один раз типа добавить товар, присвоить ему категорию, и характеристику товара, и для всего заюзать одну и ту же функцию add
    в каждой из них она какбы переопределяет родительскую и выполняется по разному но тем немении можно как то так выебнуться что б не лезть к
    каждому объекту и давать ему то че он принимает, а скормить им всем одну модель в один общий метод и они сами разберутся кому че надо...
    хз чет типо того вроде как
 */


massGreeting(personList)


