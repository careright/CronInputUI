export function CssTemplateGenerator(obj) {
    return `
cron-input-ui[id=${obj.id}] .btn-custom {
    background-color: ${obj.colorMain};
    border-color: ${obj.colorSecond};
}

cron-input-ui[id=${obj.id}] .btn-custom:hover {
    background-color: ${obj.colorSecond};
    border-color: ${obj.colorMain};
}

cron-input-ui[id=${obj.id}] input[type="radio"]:checked:after {
    background-color: ${obj.colorMain};
}

cron-input-ui[id=${obj.id}] input[type="radio"] {
    border: 1px solid ${obj.colorSecond};
}

cron-input-ui[id=${obj.id}] .container input:checked ~ .checkmark {
    background-color: ${obj.colorMain};
}

cron-input-ui[id=${obj.id}] .container:hover input ~ .checkmark {
    background-color: ${obj.colorSecond};
}
    `;
}
