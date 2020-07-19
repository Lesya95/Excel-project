class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }
  // добавление события
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  // удаление события
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  // вставляет в документ елемент
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  // метод возвращает координаты елемента
  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  // получение всех дом-елементов с указанным селектором
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  // метот установки стилей елементу
  css(styles = {}) {
  // Метод Object.keys() возвращает массив из собственных перечисляемых свойств
  // переданного объекта
    Object
        .keys(styles)
        .forEach(key => {
          this.$el.style[key] = styles[key]
        })
  }
}


export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
