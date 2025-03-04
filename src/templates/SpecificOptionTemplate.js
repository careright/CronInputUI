export function SpecificOptionTemplateGenerator(getNumber, number) {
    return `
<div class="form-checkbox">
    <label class="container">
        <span class="numberValue">${getNumber}</span>
        <input class="propagationClass" value='${number}' type="checkbox">
        <span class="checkmark"></span>
    </label>
</div>
    `;
}
