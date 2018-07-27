import { createSerializer } from 'jest-emotion';
import * as emotion from 'emotion';

// Serialize emotion styles into snapshots
expect.addSnapshotSerializer(createSerializer(emotion));
