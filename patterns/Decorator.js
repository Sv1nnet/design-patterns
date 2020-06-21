
// https://codepen.io/leonid-tsukanov/pen/LYGWYmJ

// Create array of <li> elements that can be insert into <ul> or <ol>
class HTMLList {
  constructor(elements) {
    this.liElements = elements.map((el) => {
      const li = document.createElement('li');
      li.innerText = el.innerText;
      return li;
    });
  }

  addItem(item) {
    const newItem = document.createElement('li');
    newItem.innerText = item.innerText;
    this.liElements.push(newItem);

    return newItem;
  }

  removeItem(item) {
    this.liElements = this.liElements.filter(li => li !== item);
    return item;
  }
}

// Create <ul> and insert <li> elements into it
class UList extends HTMLList {
  constructor(elements) {
    super(elements);
    this.list = document.createElement('ul');
    this.liElements.forEach(li => this.list.appendChild(li));
  }

  addItem(item) {
    const newItem = HTMLList.prototype.addItem.call(this, item);
    this.list.appendChild(newItem);
  }

  removeItem(item) {
    const itemToRemove = HTMLList.prototype.removeItem.call(this, item);
    this.list.removeChild(itemToRemove);
  }
}

// Create <ol> and insert <li> elements into it
class OList extends HTMLList {
  constructor(elements) {
    super(elements);
    this.list = document.createElement('ol');
    this.liElements.forEach(li => this.list.appendChild(li));
  }

  addItem(item) {
    const newItem = HTMLList.prototype.addItem.call(this, item);
    this.list.appendChild(newItem);
  }

  removeItem(item) {
    const itemToRemove = HTMLList.prototype.removeItem.call(this, item);
    this.list.removeChild(itemToRemove);
  }
}

/**
 * Decorate list method with date of the last update
 * @param {OList|UList} list - a list whose method have to be decorated
 * @param {string} method - name of method to decorate
 */
function lastDateUpdateDecorator(list, method) {
  const methodToDecorate = list[method];
  list[method] = function decoratedMethod(...args) {
    methodToDecorate.call(list, ...args);

    const updateDate = new Date();
    let dateContainer = list.list.querySelector('.date-update');

    if (!dateContainer) {
      dateContainer = document.createElement('span');
      dateContainer.classList.add('date-update');
      list.list.prepend(dateContainer);
    }

    dateContainer.innerText = 'last updated: ' + updateDate.getHours() + ':' + updateDate.getMinutes() + ':' + updateDate.getSeconds();
  }
}


const ol = new OList([{ innerText: 'first li item' }, { innerText: 'second li item' }]);
document.body.appendChild(ol.list);
ol.addItem({ innerText: 'added item ' });

lastDateUpdateDecorator(ol, 'addItem');
ol.addItem({ innerText: 'added item after decoration' });

let itemToRemove = ol.liElements[0];
ol.removeItem(itemToRemove);

lastDateUpdateDecorator(ol, 'removeItem');
itemToRemove = ol.liElements[0];
ol.removeItem(itemToRemove);