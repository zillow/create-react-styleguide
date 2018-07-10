import path from 'path';

const currentPath = process.cwd();
const binPath = path.join(currentPath, 'node_modules/.bin');

export const nwb = path.join(binPath, 'nwb');
export const styleguidist = path.join(binPath, 'styleguidist');
export const eslint = path.join(binPath, 'eslint');
