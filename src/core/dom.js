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

  text(text) {
    // если text - строка то метод работает как сетер(устанавл контекст елем) 
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }
    // если <input> то получаем значение инпута. геттер
    if (this.$el.tagName.toLowerCase() === 'input') {
      // Метод trim() удаляет пробельные символы с начала и конца строки
      return this.$el.value.trim()
    }
    // иначе получаем контекст елемента. геттер
    return this.$el.textContent.trim()
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

  // метод который ищет один елемент в дом-дереве
  find(selector) {
    return $(this.$el.querySelector(selector))
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

  /* если не передать parse то метод возвращает значение атрибута data-id
  но если его передать то вернет обьект с id строчек и колонок*/
  id(parse) {
    if (parse) {
      const parsed= this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }
  
  focus() {
    this.$el.focus()
    return this
  }

  // метод добавляет класс елементу
  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  // метод удаляет класс у елементу
  removeClass(className) {
    this.$el.classList.remove(className)
    return this
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
