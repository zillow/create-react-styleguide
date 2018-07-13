import path from 'path';

const currentPath = process.cwd();
const binPath = path.join(currentPath, 'node_modules/.bin');

export const eslint = path.join(binPath, 'eslint');
export const nodemon = path.join(binPath, 'nodemon');
export const nwb = path.join(binPath, 'nwb');
export const styleguidist = path.join(binPath, 'styleguidist');
