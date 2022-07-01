export function CssTemplateGenerator(obj) {
    return `
cron-expression-input .btn-custom {
    background-color: ${obj.colorMain};
    border-color: ${obj.colorSecond};
}

cron-expression-input .btn-custom:hover {
    background-color: ${obj.colorSecond};
    border-color: ${obj.colorMain};
}

cron-expression-input input[type="radio"]:checked:after {
    background-color: ${obj.colorMain};
}

cron-expression-input input[type="radio"] {
    border: 0.1em solid ${obj.colorSecond};
}

cron-expression-input .container input:checked ~ .checkmark {
    background-color: ${obj.colorMain};
}

cron-expression-input .container:hover input ~ .checkmark {
    background-color: ${obj.colorSecond};
}
    `;
}
