import { createSerializer } from 'jest-emotion';
import * as emotion from 'emotion';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Configure enzyme to use React 16.x adapter
Enzyme.configure({ adapter: new Adapter() });

// Serialize emotion styles into snapshots
expect.addSnapshotSerializer(createSerializer(emotion));
