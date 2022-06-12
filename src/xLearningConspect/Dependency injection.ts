

class User2 {
  public age: number;
  public userName: string
}

interface UserRepo1 {
  getUsers: () => User2[];
}

class  UserMongoDBRepo implements UserRepo1 {
  getUsers(): User2[] {
    console.log('Получаем пользователей из бд')
    return [{age: 15, userName: 'Вася'}]
  }
}

class UserPostgresRepo implements UserRepo1 {
  getUsers(): User2[] {
    console.log('Получаем пользователей из бд')
    return [{age: 15, userName: 'Вася'}]
  }
}

class UserService {
  userRepo: UserRepo1;
  //такой тип взаимодействия кст - АГРЕГАЦИЯ
  constructor(userRepo: UserRepo1) {
    this.userRepo = userRepo;
  }
  finlterUserByAge (age: number) {
    const  users = this.userRepo.getUsers()
    //какая то логика
    console.log(users)
  }
}

const  userService = new UserService(new UserMongoDBRepo())
userService.finlterUserByAge(15)

/*
Здесь крч типа сервис остается неизменным но мы определяем то как он будет работать передав
соответсвующий аргумент в конструктор откудато из вне
 */