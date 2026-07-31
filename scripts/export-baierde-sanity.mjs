import { mkdirSync, writeFileSync } from 'node:fs'
import { createClient } from '@sanity/client'

const client = createClient({ projectId: '746jvz7j', dataset: 'production', apiVersion: '2024-01-01', useCdn: false })
const inventory = await client.fetch(`{
  "types": array::unique(*[]._type),
  "categories": *[_type == "category"] | order(sortOrder asc){_id,title,"slug":slug.current,description,sortOrder,"imageUrl":image.asset->url},
  "series": *[_type == "series"] | order(sortOrder asc){_id,name,"slug":slug.current,sortOrder,"categorySlug":category->slug.current},
  "products": *[_type == "product"] | order(sortOrder asc){_id,_createdAt,_updatedAt,title,"slug":slug.current,shortDescription,frequencyMax,impedance,mountingType,tags,specs,sortOrder,"seriesName":series->name,"seriesSlug":series->slug.current,"categorySlug":series->category->slug.current,"imageUrl":mainImage.asset->url,"videoFileUrl":productVideo.videoFile.asset->url,"videoPosterUrl":productVideo.poster.asset->url,productVideo},
  "articles": *[_type in ["blogPost","post","article"]]{_id,_createdAt,_updatedAt,title,"slug":slug.current,excerpt,publishedAt,content,body,"imageUrl":coalesce(mainImage.asset->url,coverImage.asset->url,image.asset->url)},
  "inquiries": *[_type == "inquiry"]{_id,_createdAt,name,email,company,country,product,quantity,message,productSlug,attachmentFileName,status,createdAt},
  "assets": *[_type in ["sanity.imageAsset","sanity.fileAsset"]].url
}`)
mkdirSync('migration', { recursive: true })
writeFileSync('migration/baierde-source-inventory.json', JSON.stringify(inventory, null, 2))
console.log(JSON.stringify({ types: inventory.types, categories: inventory.categories.length, series: inventory.series.length, products: inventory.products.length, articles: inventory.articles.length, inquiries: inventory.inquiries.length, assets: inventory.assets.length }))
