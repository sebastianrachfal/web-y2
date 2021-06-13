import { getColorFromTime } from '@/helpers';
import config from '@/config';

const PARENT_CLASS = 'font-weight: bold; color: #FFB86C';
const NAME_CLASS = 'color: #8BE9FD';
const DEFAULT_CLASS = 'color: #f8f8f0';

const profiler = (
	target: Object,
	propertyKey: string,
	descriptor: PropertyDescriptor
) => {
	if (process.env.NODE_ENV !== 'development' || !config.PROFILING)
		return descriptor;
	const val = descriptor.value;
	descriptor.value = function (...args: any) {
		const start = performance.now();
		const result = val.apply(this, args);
		const time = performance.now() - start;
		console.log(
			`%c${
				target.constructor.name
			}%c.%c${propertyKey}()%c took: %c${time.toFixed(2)}ms`,
			PARENT_CLASS,
			DEFAULT_CLASS,
			NAME_CLASS,
			DEFAULT_CLASS,
			getColorFromTime(time)
		);

		return result;
	};

	return descriptor;
};

export default profiler;
