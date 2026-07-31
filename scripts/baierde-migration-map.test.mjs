import test from 'node:test'
import assert from 'node:assert/strict'
import { BAIERDE_TENANT_ID, rootCategory, product, article } from './baierde-migration-map.mjs'
const assets = new Map([['image', 'https://r2/image.jpg']])
test('maps product and R2 image', () => { const row = product({_id:'p',slug:'sma',title:'SMA',categorySlug:'connectors',imageUrl:'image',specs:[]}, BAIERDE_TENANT_ID, assets, 1); assert.equal(row.image_url, 'https://r2/image.jpg'); assert.equal(row.category_slug, 'connectors') })
test('normalizes whitespace in product slug with stable source suffix', () => { const row = product({_id:'source123456',slug:'sma-rf- connector',title:'SMA',categorySlug:'connectors',specs:[]}, BAIERDE_TENANT_ID, assets, 1); assert.equal(row.slug, 'sma-rf-connector-source12') })
test('maps article body', () => { const row = article({_id:'a',slug:'post',title:'Post',body:[{_type:'block',children:[{text:'Body'}]}],_createdAt:'2026-01-01'}, BAIERDE_TENANT_ID, assets); assert.equal(row.content, '<p>Body</p>') })
test('guards tenant', () => assert.throws(() => rootCategory({slug:'x',title:'X'}, 'wrong', assets, 1), /foreign/))
