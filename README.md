# Задача «Инструменты тестирования Аркадия»

Перед выполнением задания внимательно прочитайте:

- [О всех этапах проверки задания](https://github.com/urfu-2019/guides/blob/master/workflow/overall.md)
- [О том, как отправить пулл](https://github.com/urfu-2019/guides/blob/master/workflow/pull.md)
- [О том, как пройти тесты](https://github.com/urfu-2019/guides/blob/master/workflow/test.md)
- Правила оформления [javascript](https://github.com/urfu-2019/guides/blob/master/codestyle/js.md), [HTML](https://github.com/urfu-2019/guides/blob/master/codestyle/html.md) и [CSS](https://github.com/urfu-2019/guides/blob/master/codestyle/css.md) кода

## Основное задание

Все прошлые выходные Аркадий решил посвятить домашним делам, и начал он с приборки в гараже.
Однако все его планы были нарушены, когда он нашел в дальнем пыльном углу гаража свои старые
инструменты. Инструменты для тестирования программ на Node.js.

Он ужаснулся тому, в каком они были состоянии, и стал чистить их,
приводить в порядок и раскладывать по полочкам.
Только когда уже стемнело, Аркадий понял, что одному ему не справиться, и позвал вас на помощь.

Цель этого задания – разработать инструмент, облегчающий процесс тестирования.

Для этого нужно реализовать модуль `check.js`, который при инициализации расширяет прототипы базовых классов, добавляя в них вспомогательные методы.

> Расширение прототипа следует использовать с осторожностью, так как оно может усложнить понимание кода. В целом этот метод считается плохой практикой, но может быть эффективно применён при решении ряда задач. Например, при тестировании кода.

При расширении прототипа базового класса всегда есть риск перезаписать уже имеющиеся свойства. Чтобы минимизировать вероятность этого нежелательного события, можно расширить базовый класс только одним свойством, называемым namespace – пространством имён.
Все вспомогательные методы кладутся в это свойство и не засоряют базовый класс.

Предлагается реализовать такое пространство имён и добавить в него различные методы для тестирования.

Пример:

```js
var check = require('check.js');

check.init(); // в этот момент происходит расширение
              // прототипов базовых классов

var me = {
    name: 'Roman',
    age: 26
};

me.check.containsKeys(['age', 'name']); // true
me.check.hasValueType(['age', String]) // false
```

Другие примеры использования вашего кода можно посмотреть в файле `check.spec.js`.

## Требования

> :warning: Нельзя использовать внешние библиотеки

> :warning: Можно использовать функции-конструкторы и методы работы с прототипами, и нельзя использовать «классы».

Необходимо реализовать перечисленные ниже методы. Метод должен быть определен только для целей указанного типа.

* `containsKeys(keys)` Определён для объектов и массивов. Проверяет, что цель содержит указанные ключи.
* `hasKeys(keys)` Определён для объектов и массивов. Проверяет, что цель содержит только указанные ключи.
* `containsValues(values)` Определён для объектов и массивов. Проверяет, что цель содержит указанные значения.
* `hasValues(values)` Определён для объектов и массивов. Проверяет, что цель содержит только указанные значения.
* `hasValueType(key, type)` Определён для объектов и массивов. Проверяет, что значение по указанному ключу относится к указанному типу. Поддерживаемые типы: `String`, `Number`, `Function`, `Array`.
* `hasLength(length)` Определён для массивов и строк. Проверяет, что длина цели соответствует указанной.
* `hasParamsCount(count)` Определён для функций. Проверяет, что количество аргументов функции соответствует указанному.
* `hasWordsCount(count)` Определён для строк. Проверяет, что количество слов в строке соответствует указанному. Словом считается последовательность символов, отличных от пробела, ограниченная с обеих сторон пробелами или началом/концом строки.

### null

Как известно, у `null` нет прототипа, поэтому добавить для него вспомогательные методы обычным образом не получится.

Предлагается добавить метод-обёртку `wrap`, позволяющий работать с `null`, и реализовать метод `isNull()`.

> :warning: Важно! Так как при тестировании мы можем не знать заранее, что приходит во `wrap`, в обёртке должны быть определены **все** методы для тестирования. Если метод не определен для обернутого типа, он должен возвращать `false`

```js
var check = require('check.js');

var wrappedNull = check.wrap(null);

wrappedNull.isNull(); // true
wrappedNull.hasLength(5); // false

var wrappedString = check.wrap('hello');

wrappedString.isNull(); // false
wrappedString.hasLength(5); // true
```

### not

Предлагается реализовать свойство `.not`, отрицающее любой из стандартных методов:

```js
var check = require('check.js');

check.init();

var me = {
    name: 'Roman',
    age: 26
};

me.check.not.containsKeys(['age', 'name']); // false
me.check.not.hasValueType(['age', String]) // true
```

![](https://user-images.githubusercontent.com/4534405/68857071-d3ec5a80-0703-11ea-9244-9e1cb39f65ae.jpg)
