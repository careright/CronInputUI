import { CronFields } from './nodes/CronFields';
import { CronExpressionInput } from './nodes/CronExpressionInput';

import './index.css';

customElements.define('cron-fields', CronFields);
customElements.define('cron-input-ui', CronExpressionInput);
