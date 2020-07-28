export class Emitter {
  constructor() {
    this.listeners = {}
  }

  /* уведомляем слушатели если они есть. event - название переданого
   собития, ...args - другие параметры которые передали*/
  // table.emit('table:select', {a:1})
  emit(event, ...args) {
    // если у обьект this.listeners по ключу event храниться не массив то {...}
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    /* иначе проходим цыклом по массиву который храниться в обекте this.
    listeners по ключу event. в массиве храняться функции, проходя
     циклом вызываеться функции с переданым аргументом */
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  /* позволяет подписаться на определенный тип событий, подписываемся
   на уведомления, добавляем нового слушателя.
   первым параметром принимает событие, вотррым функцию*/
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = 
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}


// const emitter = new Emitter()
// emitter.subscribe('vlad', data => console.log('sub:', data))
// emitter.emit('vlad', 42)

// setTimeout(() => {
//   emitter.emit('vlad', 'After 2 sec')
// }, 2000)

// setTimeout(() => {
//   unsub()
// }, 3000)

// setTimeout(() => {
//   emitter.emit('vlad', 'After 4 sec')
// }, 4000)

