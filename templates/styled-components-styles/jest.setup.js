import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';

// Configure enzyme to use React 16.x adapter
Enzyme.configure({ adapter: new Adapter() });
