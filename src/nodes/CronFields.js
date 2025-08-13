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

        queueMicrotask(() => this.relabelMonthOptions());
        queueMicrotask(() => this.relabelDaysOfWeekOptions());

        this.querySelectorAll(".propagationClass.form-check-input").forEach((input) => {
            input.addEventListener("change", (event) => {
                this.querySelectorAll(".propagationClass").forEach((el) => {
                    el.disabled = true;
                });
                this.querySelectorAll(".propagationClass.form-check-input").forEach((el) => {
                    el.disabled = false;
                });

                const selectedInput = this.querySelector("input[name='choice']:checked");
                const selectedValue = selectedInput ? selectedInput.value : null;
                console.log("Selected value:", selectedValue);

                const parentPanel = event.target.closest(".panel");
                if (parentPanel) {
                parentPanel.querySelectorAll(".propagationClass").forEach((el) => {
                    el.disabled = false;
                });
                }
            });
        });
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
            match.innerHTML += SpecificOptionTemplateGenerator(this.getNumber(i), i);
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

    relabelMonthOptions() {
        // Works only on the Months tab
        const kind = this.getAttribute('input') || this.input;
        if (kind !== 'months' && kind !== 'month') return;

        // prefer locale names if present
        const months =
        (inputLangInternal.monthsShort && inputLangInternal.monthsShort.length === 12)
            ? inputLangInternal.monthsShort
            : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

        // selects to relabel
        const selects = this.querySelectorAll('select[match="every"], select[match="start"], select[match="rangeMin"], select[match="rangeMax"]');

        selects.forEach((sel) => {
            sel.querySelectorAll('option').forEach((opt) => {
                const n = parseInt(opt.value, 10);  // values are 1..12
                if (!isNaN(n) && n >= 1 && n <= 12) {
                opt.textContent = months[n - 1];
                }
            });
        });

        // 2) Relabel the "Choice" chips' visible numbers -> month names
        //    Structure looks like: <span class="numberValue">02</span>
        //    We keep the checkbox value numeric; only the label text changes.
        try {
            const chipNumberSpans = this.querySelectorAll('[match="specific"] .container .numberValue');
            chipNumberSpans.forEach((span) => {
            // Always work with a string
            const raw = (span.dataset.number ?? span.textContent ?? '').toString().trim();

            // Only convert pure 1..2 digit numbers
            if (!/^\d{1,2}$/.test(raw)) return;

            const n = parseInt(raw, 10);
            if (n < 1 || n > 12) return;

            // Remember original number for idempotency / tooltip
            span.dataset.number = raw.padStart(2, '0');
            span.textContent = months[n - 1];      // show month name
            if (!span.title) span.title = span.dataset.number; // optional tooltip
            });
        } catch (e) {
            // Never let a chip relabel glitch break the whole function
            console.warn('Month chip relabel skipped:', e);
        }
    }

    relabelDaysOfWeekOptions() {
        // Only on the Days of Week tab
        const kind = this.getAttribute('input') || this.input;
        if (kind !== 'daysOfWeek' && kind !== 'dayOfWeek') return;

        // Prefer localized short names if available
        const days =
            (inputLangInternal.daysShort && inputLangInternal.daysShort.length === 7)
            ? inputLangInternal.daysShort
            : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // 1) Relabel select options
        const selects = this.querySelectorAll(
            'select[match="every"], select[match="start"], select[match="rangeMin"], select[match="rangeMax"]'
        );
        selects.forEach((sel) => {
            sel.querySelectorAll('option').forEach((opt) => {
            const n = parseInt(opt.value, 10); // values are 0..6 or 1..7
            if (!Number.isNaN(n)) {
                // Cron can be 0=Sun or 7=Sun, normalise
                let dayIndex = (n === 7) ? 0 : n;
                if (dayIndex >= 0 && dayIndex <= 6) {
                if ('label' in opt) opt.label = days[dayIndex];
                else opt.text = days[dayIndex];
                }
            }
            });
        });

        // 2) Relabel Choice chips
        try {
            const chipNumberSpans = this.querySelectorAll('[match="specific"] .container .numberValue');
            chipNumberSpans.forEach((span) => {
            const raw = (span.dataset.number ?? span.textContent ?? '').toString().trim();
            if (!/^\d{1,2}$/.test(raw)) return;

            let n = parseInt(raw, 10);
            if (n === 7) n = 0; // handle Sunday = 7
            if (n < 0 || n > 6) return;

            span.dataset.number = raw; // keep original number
            span.textContent = days[n];
            if (!span.title) span.title = span.dataset.number;
            });
        } catch (e) {
            console.warn('Day-of-week chip relabel skipped:', e);
        }
    }

}
