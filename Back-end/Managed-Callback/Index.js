function Do(func) {
    if(func != undefined) {
        this.broken = false;
        this.result = func();
    }
}

Do.prototype.then = function(func) {
    if(this.broken === false) {
        this.result = func(this.result);
    }

    return this;
}

Do.prototype.break = function(func) {
    this.broken = true;

    if(func != undefined) {
        func(this.result);
    }

    return null;
}