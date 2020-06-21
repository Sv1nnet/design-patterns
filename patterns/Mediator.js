// Centralize the communication between set of objects, created from a particular class.
// https://codepen.io/leonid-tsukanov/pen/VwepYrL

const Person = (function () {
  const privateProps = new WeakMap();

  class Person {
    constructor(name) {
      privateProps.set(this, {
        name,
        chat: null,
      }); // this is private
    }

    receive(from, message) { console.log(`${from.name()}: ${message}`); }
    send(to, message) { privateProps.get(this).chat.message(this, to, message); }
    initChat(chat) { privateProps.get(this).chat = chat; }
    name() { return privateProps.get(this).name; }
  }

  return Person;
})();

const ChatMediator = (function () {
  const privateProps = new WeakMap();

  class ChatMediator {
    constructor() {
      privateProps.set(this, {
        persons: [],
        chat: this,
      });
    }

    message(from, to, message) {
      const { persons } = privateProps.get(this);
      const toIndex = persons.indexOf(to);
      if (toIndex > -1) persons[toIndex].receive(from, message);
    }

    register(person) {
      const { persons, chat } = privateProps.get(this);
      person.initChat(chat);
      persons.push(person);
    }

    unRegister(person) {
      const { persons } = privateProps.get(this);
      person.initChat(null);
      delete persons[person.name()];
    }
  }

  return ChatMediator;
})();


//Usage:
let chat = new ChatMediator();

let colton = new Person('Colton');
let ronan = new Person('Ronan');

chat.register(colton);
chat.register(ronan);

colton.send(ronan, 'Hello there, nice to meet you');
ronan.send(colton, 'Nice to meet you to');

colton.send(ronan, 'Goodbye!');
chat.unRegister(colton);
