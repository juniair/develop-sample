

class Subject {
    constructor() {
        this.observers = [];
    }

    registerObserver(observer) {
        this.observers.push(observer);
    }

    unregisterObserver(observer) {
        let index = this.observers.indexOf(target);
        if(-1 < index) {
            this.observers.splice(index, index);
        }
    }


    notifyObservers(data) {
        for (const observer of this.observers) {
            observer.notify(data);
        }
    }
}

class DisplayObjserver {
    constructor(type, value, handler) {
        this.type = type;
        this.value = value;
        if(typeof handler === "function" || typeof handler === "Function") {
            this.handler = handler;
        }
    }

    notify(data) {
        if(data.type === this.type) {
            this.value += data.value;
            if(typeof this.handler === "function" || typeof this.handler === "Function") {
                this.handler(this.value);
            }
            
        }
    }
}
