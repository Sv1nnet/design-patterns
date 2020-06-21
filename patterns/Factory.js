
// https://codepen.io/leonid-tsukanov/pen/dyGvyMK

class HTMLList {
  constructor(elements) {
    this.liElements = elements.map((el) => {
      const li = document.createElement('li');
      li.innerText = el.innerText;
      return li;
    });
  }
}

class UList extends HTMLList {
  constructor(elements) {
    super(elements);
    this.list = document.createElement('ul');
    this.liElements.forEach(li => this.list.appendChild(li));
  }
}

class OList extends HTMLList {
  constructor(elements) {
    super(elements);
    this.list = document.createElement('ol');
    this.liElements.forEach(li => this.list.appendChild(li));
  }
}

class ListFactory {
  createList({ type = 'ul', elements = [] }) {
    switch (type) {
      case 'ul':
        return new UList(elements);
      case 'ol':
        return new OList(elements);
      default:
        throw new Error('Type is not valid');
    }
  }
}


// class UList extends HTMLList {
//   constructor({ classList, elements }) {
//     super(elements);
//     const list = document.createElement('ul');
//     classList.forEach(className => list.classList.add(className));

//     this.liElements.forEach(li => list.appendChild(li));
//     this.list = list;
//   }
// }

// class OList extends HTMLList {
//   constructor({ classList, elements }) {
//     super(elements);
//     const list = document.createElement('ol');
//     classList.forEach(className => list.classList.add(className));

//     this.liElements.forEach(li => list.appendChild(li));
//     this.list = list;
//   }
// }

// class ListFactory {
//   constructor(classList = []) {
//     this.classList = classList;
//   }

//   createList({ type = 'ul', elements = [] }) {
//     switch (type) {
//       case 'ul':
//         return new UList({ classList: this.classList, elements });
//       case 'ol':
//         return new OList({ classList: this.classList, elements });
//       default:
//         throw new Error('Type is not valid');
//     }
//   }
// }

