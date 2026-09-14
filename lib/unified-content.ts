import { createClient } from '@supabase/supabase-js'
import type { Product, BlogPost } from './mock-data'
import { localized, safeArticleHtml } from './news-content.mjs'

const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
const client = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, { auth: { persistSession: false } }) : null
export type DbCategory = { id:string; slug:string; name:string; description:string|null; icon:string|null; parent_id:string|null; sort_order:number|null; extra_data:Record<string,unknown>|null }
export async function dbCategories(): Promise<DbCategory[]|null> { if(!client||!tenantId)return null; const {data,error}=await client.from('product_categories').select('id,slug,name,description,icon,parent_id,sort_order,extra_data').eq('tenant_id',tenantId).eq('is_active',true).order('sort_order'); return error?null:data }
export async function dbProducts(): Promise<Product[]|null> { if(!client||!tenantId)return null; const {data,error}=await client.from('products').select('id,slug,name,description,category_slug,image_url,specs,extra_data').eq('tenant_id',tenantId).eq('is_active',true).order('sort_order'); if(error)return null; return data.map((row)=>{const extra=(row.extra_data||{}) as Record<string,any>;return{_id:row.id,title:row.name,slug:row.slug,category:row.category_slug,series:extra.series,shortDescription:row.description||'',description:row.description||'',specs:Array.isArray(row.specs)?row.specs:[],images:Array.isArray(extra.images)?extra.images.filter(Boolean):row.image_url?[row.image_url]:[],productVideo:extra.productVideo||null,seo:{title:row.name,description:row.description||`${row.name} from Baierde Electronic`}} as Product}) }
export async function dbProduct(slug:string){const rows=await dbProducts();return rows===null?undefined:rows.find((row)=>row.slug===slug)||null}
export async function dbArticles(locale = 'en'): Promise<BlogPost[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key || !tenantId) throw new Error('News configuration is missing')
  async function query(table: string, params: Record<string, string>) {
    const response = await fetch(`${url}/rest/v1/${table}?${new URLSearchParams(params)}`, {
      headers: { apikey: key!, Authorization: `Bearer ${key}` }, cache: 'no-store',
    })
    if (!response.ok) throw new Error(`News data request failed (${response.status})`)
    return response.json()
  }
  const tenantRows = await query('tenants', { id: `eq.${tenantId}`, select: 'default_language' })
  const defaultLanguage = (Array.isArray(tenantRows) ? tenantRows[0] : tenantRows)?.default_language || 'en'
  const articles: BlogPost[] = []
  for (let offset = 0; ; offset += 500) {
    const rows = await query('articles', {
      tenant_id: `eq.${tenantId}`, is_published: 'eq.true',
      select: 'id,slug,title,excerpt,content,title_i18n,excerpt_i18n,content_i18n,published_at,updated_at,featured_image',
      order: 'published_at.desc,id.asc', limit: '500', offset: String(offset),
    })
    if (!Array.isArray(rows)) throw new Error('Invalid news data response')
    for (const row of rows) {
      const title = localized(row.title_i18n, locale, defaultLanguage, row.title)
      const excerpt = localized(row.excerpt_i18n, locale, defaultLanguage, row.excerpt)
      articles.push({ _id: row.id, slug: row.slug, title, excerpt,
        content: safeArticleHtml(localized(row.content_i18n, locale, defaultLanguage, row.content)),
        publishedAt: row.published_at, updatedAt: row.updated_at,
        featuredImage: row.featured_image || undefined,
        seo: { title, description: excerpt || title },
      })
    }
    if (rows.length < 500) return articles
  }
}
export async function dbCatalogFile(){if(!client||!tenantId)return null;const {data,error}=await client.from('tenants').select('extra_settings').eq('id',tenantId).single();if(error)return null;const settings=(data.extra_settings||{}) as Record<string,unknown>;return typeof settings.catalog_file_url==='string'?{fileUrl:settings.catalog_file_url,fileName:typeof settings.catalog_file_name==='string'?settings.catalog_file_name:'product-catalog.pdf'}:null}
