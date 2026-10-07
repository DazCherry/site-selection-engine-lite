import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {MODEL_VERSION} from '../dist/model.mjs';

// Immutable v0.1.0 public scoring baseline. A change requires a documented defect exception.
test('distribution work preserves the released v0.1.0 scoring engine byte for byte',()=>{
 assert.equal(MODEL_VERSION,'lite-map-context-1.0.0');
 assert.equal(createHash('sha256').update(readFileSync(new URL('../dist/model.mjs',import.meta.url))).digest('hex'),'1e9d9fb209788dcb00961897c39e3f58c44c0c56724104f39111abdf8391fa94');
});
