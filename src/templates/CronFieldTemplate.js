export function CronFieldTemplateGenerator(objLang) {
    return `
<form class="panel-form">
    <div class="panel-group">
        <div class="panel">
            <div class="panel-heading">
                <label>
                    <input class="propagationClass form-check-input" type="radio" name="choice" value="1" match="choice" checked>
                    <span>${objLang.frequencyChoice}</span>
                </label>
            </div>
            <div class="panel-body">
                <div class="form-group-half">
                    <label class="form-check-label">${objLang.every}</label>
                    <select match="every" class="propagationClass form-control form-select">
                        <option>*</option>
                    </select>
                </div>
                <div class="form-group-half">
                    <label class="form-check-label">${objLang.start}</label>
                    <select match="start" class="propagationClass form-control form-select">
                        <option>*</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="panel">
            <div class="panel-heading">
                <label>
                    <input class="propagationClass form-check-input" type="radio" name="choice" value="2" match="choice">
                    <span>${objLang.rangeChoice}</span>
                </label>
            </div>
            <div class="panel-body">
                <div class="form-group-half">
                    <label class="form-check-label">${objLang.min}</label>
                    <select match="rangeMin" class="propagationClass form-control form-select">
                    </select>
                </div>
                <div class="form-group-half">
                    <label class="form-check-label">${objLang.max}</label>
                    <select match="rangeMax" class="propagationClass form-control form-select">
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div class="panel">
        <div class="panel-heading">
            <label>
                <input class="propagationClass form-check-input" type="radio" name="choice" value="3" match="choice">
                <span>${objLang.choice}</span>
            </label>
        </div>
        <div class="panel-body">
            <div match="specific" class="form-group-full">
            </div>
        </div>
    </div>
</form>
    `;
}
