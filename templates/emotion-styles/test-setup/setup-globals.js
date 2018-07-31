/* global expect */
import { createSerializer } from 'jest-emotion';
import * as emotion from 'emotion';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Configure shallow render
Enzyme.configure({ adapter: new Adapter() });
global.shallow = Enzyme.shallow;

// Serialize emotion styles into snapshots
expect.addSnapshotSerializer(createSerializer(emotion));
