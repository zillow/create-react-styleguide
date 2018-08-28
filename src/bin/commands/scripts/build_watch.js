import noop from '../../util/noop';
import build from './build';

export default (argv, callback = noop) => build(argv, callback, true);
