/* eslint-disable zillow/import/no-extraneous-dependencies */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Configure shallow render
Enzyme.configure({ adapter: new Adapter() });
