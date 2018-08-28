import path from 'path';

const currentPath = process.cwd();
const binPath = path.join(currentPath, 'node_modules/.bin');

export const eslint = path.join(binPath, 'eslint');
export const styleguidist = path.join(binPath, 'styleguidist');
export const babel = path.join(binPath, 'babel');
export const jest = path.join(binPath, 'jest');
