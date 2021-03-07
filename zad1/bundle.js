var CustomInputElement = /** @class */ (function () {
    function CustomInputElement(id, rm, up) {
        this.id = id;
        this.remove = rm;
        this.update = up;
        this.populateElements();
    }
    CustomInputElement.prototype.populateElements = function () {
        var _this = this;
        this.inputEl = document.createElement('input');
        this.inputEl.type = 'number';
        this.inputEl.addEventListener('change', function () { return _this.update(); });
        this.btnEl = document.createElement('button');
        this.btnEl.innerText = 'X';
        this.btnEl.addEventListener('click', function () { return _this.remove(_this.id); });
        this.liEl = document.createElement('li');
        this.liEl.appendChild(this.inputEl);
        this.liEl.appendChild(this.btnEl);
    };
    CustomInputElement.prototype.getElement = function () {
        return this.liEl;
    };
    return CustomInputElement;
}());
var Main = /** @class */ (function () {
    function Main() {
        this.addItems = this.addItems.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.getElements();
        console.log(this.setEl);
        this.setEl.addEventListener('click', this.addItems);
    }
    Main.prototype.getElements = function () {
        this.amoEl = document.querySelector('#amo');
        this.setEl = document.querySelector('#set');
        this.sumEl = document.querySelector('#sum');
        this.avgEl = document.querySelector('#avg');
        this.minEl = document.querySelector('#min');
        this.maxEl = document.querySelector('#max');
        this.inputContainer = document.querySelector('#fields');
    };
    Main.prototype.calculateData = function () {
        console.log('init');
    };
    Main.prototype.addItems = function () {
        var num;
        if ((num = parseInt(this.amoEl.value)) == NaN || num < 0)
            return window.alert('Invalid number');
        this.inputs = [];
        this.updateItems();
        for (var i = 0; i < num; i++)
            this.inputContainer.appendChild(this.inputs[this.inputs.push(new CustomInputElement(i, this.removeItem, this.updateItems)) - 1].getElement());
    };
    Main.prototype.updateItems = function () {
        var values = this.inputs.filter(function (input) { return input.inputEl.value.length > 0; }).map(function (input) { return +input.inputEl.value; });
        if (values.length == 0)
            return;
        var sum = 0, min = values[0], max = values[0];
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var item = values_1[_i];
            console.log(item);
            sum += item;
            if (item < min)
                min = item;
            if (item > max)
                max = item;
        }
        this.displayResults(sum, sum / values.length, min, max);
    };
    Main.prototype.removeItem = function (n) { };
    Main.prototype.displayResults = function (sum, avg, min, max) {
        this.sumEl.value = '' + sum;
        this.avgEl.value = '' + avg;
        this.minEl.value = '' + min;
        this.maxEl.value = '' + max;
    };
    return Main;
}());
new Main();
//# sourceMappingURL=bundle.js.map