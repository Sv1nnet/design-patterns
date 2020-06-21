// Enables notification of a event in one object to different set of objects ( instances of different classes)
// https://codepen.io/leonid-tsukanov/pen/yLeMPNY

// Class with private properties
const AmbulanceObserver = (function () {
  const privateProps = new WeakMap();

  class AmbulanceObserver {
    constructor(name) {
      privateProps.set(this, { name })
    }

    send(address) { console.log(privateProps.get(this).name + ' has been sent to the address: ' + address); }
    name() { return privateProps.get(this).name; }
  }

  return AmbulanceObserver;
})();

// Class with private properties
const OperatorObservable = (function () {
  const privateProps = new WeakMap();

  class OperatorObservable {
    constructor() {
      privateProps.set(this, { ambulances: [] });
    }

    send(ambulance, address) {
      const { ambulances } = privateProps.get(this);
      const ambulanceIndex = ambulances.indexOf(ambulance);

      if (ambulanceIndex > -1) {
        ambulances[ambulanceIndex].send(address);
      }
    }

    register(ambulance) {
      const { ambulances } = privateProps.get(this);
      ambulances.push(ambulance);
    }

    unRegister(ambulance) {
      const { ambulances } = privateProps.get(this);
      delete ambulances[ambulance.name()];
    }
  }

  return OperatorObservable;
})();

//Usage:
let operator = new OperatorObservable();

let amb111 = new AmbulanceObserver('111');
let amb112 = new AmbulanceObserver('112');

operator.register(amb111);
operator.register(amb112);

operator.send(amb111, '27010 La Sierra Lane Austin, MN 000');
operator.unRegister(amb111);

operator.send(amb112, '97011 La Sierra Lane Austin, BN 111');
operator.unRegister(amb112);