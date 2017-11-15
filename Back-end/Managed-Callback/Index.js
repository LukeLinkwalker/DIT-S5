exports.Do = function(func) {
    if(func != undefined) {
        this.broken = false;
        this.result = func();
    }
}

exports.Do.prototype.then = function(func) {
    if(this.broken === false) {
        this.result = func(this.result);
    }

    return this;
}

exports.Do.prototype.break = function(func) {
    this.broken = true;

    if(func != undefined) {
        func(this.result);
    }

    return null;
}