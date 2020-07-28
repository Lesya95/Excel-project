import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    // обращение к статическому полю в котором храниться имя класса компонента
    this.name = options.name || '' 
    console.log(options)
    /* сыллка на один и тодже обьект для каждого компонента
     с подпиской на события и их fn */
    this.emitter = options.emitter
    // массив хранит события подписки чтобы отписаться от них
    this.unsubscribers = []

    this.prepare()
  }

  // настраиваем компонент до init
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // подписываемля на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    // складываем события подписки в массив для дальнейшей отписки
    this.unsubscribers.push(unsub)
  }

  /* инициализируем компонентб добавл дом слушатели сокращенная
   форма добаления события*/
  init() {
    this.initDOMListeners()
  }
  // сокращенная форма удаления события, удаляем компонент, чистим слушатели
  destroy() {
    this.removeDOMListeners()
    // отписка от событий подписки 
    this.unsubscribers.forEach(unsub => unsub())
  }
}
