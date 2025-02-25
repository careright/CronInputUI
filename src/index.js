import { CronFields } from './nodes/CronFields.js';
import { CronExpressionInput } from './nodes/CronExpressionInput.js';

import './index.css';

customElements.define('cron-fields', CronFields);
customElements.define('cron-input-ui', CronExpressionInput);
