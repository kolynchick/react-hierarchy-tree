const KEY_COUNTER = 100;
const SORT_SHUFFLE_INDEX = 0.5;

var singleton;

export default function GET_RANDOM_NUMBER() {
  if (singleton === undefined)
    singleton = new GenerateNumber().getRandomNumber;
  return singleton();
}

class GenerateNumber {
  constructor() {
    this.arrayKey = [];
    this.countGenerator = 0;
  }

  getRandomNumber = () => {
    if(!this.arrayKey.length)
    	this.arrayKey = [...this.generateArray(++this.countGenerator)];

    return this.arrayKey.pop();
  }

  generateArray = (count = 0) => {
    return Array.from(Array(KEY_COUNTER))
    			.fill(0)
    			.map((element,index) => count*KEY_COUNTER+index)
    			.sort(() => Math.random() - SORT_SHUFFLE_INDEX);
  }
}

/*
  Самописный небольшой класс, для генерации ключей.
  Работает следующим образом:
  при первом вызове функции getRandomNumber проверяем массив на пустоту, если пустой,
  то вызываем функцию, в которую передаем число, указывающее, какой кратности трехзначное число создаем (1 = 100, 2 = 200, ... 7 = 700)
  создаем новый массив из 100 элементов с значением по умолчанию - 0, далее черем метод
  ES6 - map проходим по массиву, и через callback изменяем значение каждого элемента, на генерируемое число
  далее перемешиваем массив и возвращаем готовый сгенерированный массив
*/
