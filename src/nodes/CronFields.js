import defaultInputLang from '../i18n/locales/en.js';

import { CronComponent } from './CronComponent.js';
import { CronFieldTemplateGenerator } from '../templates/CronFieldTemplate.js';
import { SpecificOptionTemplateGenerator } from '../templates/SpecificOptionTemplate.js';

var inputLangInternal = {};
if (typeof inputLang == 'undefined') {
    inputLangInternal = defaultInputLang;
} else {
    inputLangInternal = inputLang.default;
}

export class CronFields extends CronComponent {
    constructor() {
        super();
    }

    connectedCallback() {
        this.Init({
            self: this,
            props: ['input', 'hasZero', 'every', 'colorMain', 'colorSecond'],
        });

        var template = CronFieldTemplateGenerator(inputLangInternal);

        this.value = '*';
        this.Create(this, template);
        this.Mount();
    }
    Mount() {
        this.addSelectOptions('every');
        this.addSelectOptions('start');
        this.addSelectOptions('rangeMin');
        this.addSelectOptions('rangeMax');
        this.addSpecificOptions('specific');
        this.eventListen('select');
        this.eventListen('input');
    }
    addSelectOptions(attr) {
        var match = this.getElement('*[match=' + attr + ']');
        for (var i = this.getHasZero(); i <= this['every']; i++) {
            var option = document.createElement('option');
            option.innerText = this.getNumber(i);
            option.value = i;
            match.appendChild(option);
        }
    }
    addSpecificOptions(attr) {
        var match = this.getElement('*[match=' + attr + ']');
        for (var i = this.getHasZero(); i <= this['every']; i++) {
            var div = document.createElement('div');
            div.innerHTML = SpecificOptionTemplateGenerator(this.getNumber(i), i);
            div.style = 'width: 55px !important;';
            match.appendChild(div);
        }
    }
    makeCron(choice, input) {
        var expression = '*';
        if (choice == 1) {
            if (input.start == '*') {
                expression = `${input.every}`;
            } else {
                expression = `${input.start}/${input.every}`;
            }
        } else if (choice == 2 && !(input.rangeMin == '*' || input.rangeMax == '*')) {
            let min = parseInt(input.rangeMin);
            let max = parseInt(input.rangeMax);
            if (min < max) {
                expression = `${input.rangeMin}-${input.rangeMax}`;
            }
        } else if (choice == 3 && input.specific.length != 0) {
            expression = '';
            input.specific.forEach((m) => {
                expression += m + ',';
            });
            expression = expression.slice(0, expression.length - 1);
        }
        this.value = expression;
    }
    eventListen(attr) {
        var self = this;
        this.getElements(attr).forEach((element) => {
            element.addEventListener('change', () => {
                var choice = self.getElement('*[match=choice]:checked').value;
                var every = self.getElement('*[match=every]').value;
                var start = self.getElement('*[match=start]').value;
                var rangeMin = self.getElement('*[match=rangeMin]').value;
                var rangeMax = self.getElement('*[match=rangeMax]').value;
                var specific = Array.prototype.map.call(
                    self.getElements('*[match=specific] input:checked'),
                    (input) => input.value
                );
                self.makeCron(choice, {
                    every,
                    start,
                    rangeMin,
                    rangeMax,
                    specific,
                });
            });
        });
    }
}
