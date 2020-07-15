import {capitalize} from '@core/utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`)
    }
    this.$root = $root // компонент
    this.listeners = listeners // массив с событиями компонента
  }

  // метод добавления события
  initDOMListeners() {
    // проходим цыклом через масив событий которые есть у компонента
    // и на каждой итерации изменяем. пример: input => onInput
    this.listeners.forEach(listener => {
      // хранит метод в виде on+событие (onInput)
      const method = getMethodName(listener)
      // проверка на одсуствие метода в классе компонента 
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(
            `Method ${method} is not implemented in ${name} Component`
        )
      }
      // создание новой функции к которой привязан контекст компонента
      // в котором вызывается эта функция 
      this[method] = this[method].bind(this)
      // Тоже самое что и addEventListener. новая запись: on(listener, fn)
      this.$root.on(listener, this[method] )// регистрирует определенный 
      // обработчик события( вещает переданое событие на компонент через
      // который проходит цыкл)
    })
  }

  // метод удаления события
  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      // Тоже самое что и removeEventListener
      this.$root.off(listener, this[method])// удаляет переданое событие
      // на компонент через который проходит цыкл
    })
  }
}

// input => onInput к переданой строке(имени собыьтию) добавляет on
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
