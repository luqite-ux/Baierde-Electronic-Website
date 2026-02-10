import {sanityClient} from './sanity.client'
import {getSpecsForSeries} from './specs-fallback'

/** ---------- Categories ---------- */
/** 分类卡片图片来自 Sanity category.image (Card Image)。 */
export type CategoryCard = {
  _id: string
  title: string
  slug: string | null
  description?: string | null
  imageUrl?: string | null
}

const CATEGORIES_QUERY = `
*[_type == "category"] | order(coalesce(sortOrder, 9999) asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  "imageUrl": image.asset->url
}
`

export async function getCategories(): Promise<CategoryCard[]> {
  return sanityClient.fetch(CATEGORIES_QUERY)
}

/** ---------- Products (optional) ---------- */
export type ProductListItem = {
  _id: string
  title: string
  slug?: string | null
  seriesName?: string | null
  imageUrl?: string | null
  shortDescription?: string | null
  frequencyMax?: number | null
  impedance?: number | null
  mountingType?: string | null
  tags?: string[] | null
}

const PRODUCTS_QUERY = `
*[_type == "product"] | order(sortOrder asc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  mountingType,
  frequencyMax,
  impedance,
  tags,
  "seriesName": series->name,
  "imageUrl": mainImage.asset->url
}
`

export async function getProducts(): Promise<ProductListItem[]> {
  return sanityClient.fetch(PRODUCTS_QUERY)
}

/** Search products by keyword (title match, case-insensitive). Returns same shape as ProductListItem. */
const PRODUCTS_SEARCH_QUERY = `
*[_type == "product" && (
  lower(title) match lower($pattern) ||
  (defined(shortDescription) && shortDescription != null && lower(shortDescription) match lower($pattern)) ||
  (defined(series->name) && lower(series->name) match lower($pattern))
)] | order(sortOrder asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  mountingType,
  frequencyMax,
  impedance,
  tags,
  "seriesName": series->name,
  "imageUrl": mainImage.asset->url
}
`

export async function getProductsBySearch(query: string): Promise<ProductListItem[]> {
  const trimmed = (query || "").trim()
  if (!trimmed) return []
  // GROQ match uses * and ? as wildcards. Strip them so pattern is *term*.
  const safe = trimmed.replace(/[*?]/g, "")
  if (!safe) return []
  const pattern = `*${safe}*`
  return sanityClient.fetch<ProductListItem[]>(PRODUCTS_SEARCH_QUERY, { pattern })
}

/** ---------- Popular Series ---------- */
export type PopularSeriesItem = {
  _id: string
  name: string
  slug: string | null
  frequencyLabel?: string | null
}

const POPULAR_SERIES_QUERY = `
*[_type == "series" && isPopular == true && category->slug.current == "connectors"] | order(sortOrder asc, _createdAt asc) {
  _id,
  name,
  "slug": slug.current,
  frequencyLabel
}
`

// Fallback frequency labels based on series name
const FALLBACK_FREQ_MAP: Record<string, string> = {
  "SMA Series": "DC-18GHz",
  "MMCX Series": "DC-6GHz",
  "MCX Series": "DC-6GHz",
  "BNC Series": "DC-4GHz",
  "SMP Series": "DC-40GHz",
}

export async function getPopularSeries(): Promise<PopularSeriesItem[]> {
  const series = await sanityClient.fetch<PopularSeriesItem[]>(POPULAR_SERIES_QUERY)
  
  // Apply fallback frequency labels if missing
  return series.map((item) => ({
    ...item,
    frequencyLabel: item.frequencyLabel || FALLBACK_FREQ_MAP[item.name] || "",
  }))
}

/** ---------- Connector Products ---------- */
export type ConnectorProduct = {
  _id: string
  title: string
  slug: string | null
  seriesName: string | null
  imageUrl: string | null
  shortDescription?: string | null
  frequencyMax?: number | null
  impedance?: number | null
  mountingType?: string | null
  sortOrder?: number | null
}

export interface ConnectorProductFilters {
  series?: string[]
  mounting?: string[]
  frequency?: string[]
  impedance?: string[]
}

// Map frequency labels to max values
const FREQUENCY_MAX_MAP: Record<string, number> = {
  "DC-4GHz": 4,
  "DC-6GHz": 6,
  "DC-12GHz": 12,
  "DC-18GHz": 18,
  "DC-40GHz": 40,
}

// Map mounting display names to values
const MOUNTING_VALUE_MAP: Record<string, string> = {
  "Straight": "straight",
  "Right Angle": "right-angle",
  "PCB Mount": "pcb",
  "Bulkhead": "bulkhead",
  "Cable Mount": "cable",
}

// Map impedance display to values
const IMPEDANCE_VALUE_MAP: Record<string, number> = {
  "50Ω": 50,
  "75Ω": 75,
}

export async function getConnectorProducts(
  filters?: ConnectorProductFilters
): Promise<ConnectorProduct[]> {
  // Build GROQ query parameters
  const params: Record<string, unknown> = {}
  let paramIndex = 0

  // Build GROQ query with filters
  let query = `*[_type == "product" && series->category->slug.current == "connectors"`
  
  // Series filter
  if (filters?.series && filters.series.length > 0) {
    const paramName = `series${paramIndex++}`
    params[paramName] = filters.series
    query += ` && series->name in $${paramName}`
  }
  
  // Mounting filter
  if (filters?.mounting && filters.mounting.length > 0) {
    const mountingValues = filters.mounting
      .map(m => MOUNTING_VALUE_MAP[m] || m.toLowerCase().replace(/\s+/g, "-"))
    const paramName = `mounting${paramIndex++}`
    params[paramName] = mountingValues
    query += ` && mountingType in $${paramName}`
  }
  
  // Frequency filter - check if frequencyMax is within any of the selected ranges
  if (filters?.frequency && filters.frequency.length > 0) {
    const maxFreqs = filters.frequency
      .map(f => FREQUENCY_MAX_MAP[f])
      .filter((f): f is number => f !== undefined)
    if (maxFreqs.length > 0) {
      // Build OR condition for frequency ranges
      // If user selects "DC-4GHz" and "DC-18GHz", show products with frequencyMax <= 4 OR <= 18
      const freqConditions = maxFreqs.map(freq => `(!defined(frequencyMax) || frequencyMax <= ${freq})`).join(" || ")
      query += ` && (${freqConditions})`
    }
  }
  
  // Impedance filter
  if (filters?.impedance && filters.impedance.length > 0) {
    const impedanceValues = filters.impedance
      .map(i => IMPEDANCE_VALUE_MAP[i])
      .filter((i): i is number => i !== undefined)
    if (impedanceValues.length > 0) {
      const paramName = `impedance${paramIndex++}`
      params[paramName] = impedanceValues
      query += ` && impedance in $${paramName}`
    }
  }
  
  query += `] | order(sortOrder asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    "seriesName": series->name,
    "imageUrl": mainImage.asset->url,
    shortDescription,
    frequencyMax,
    impedance,
    mountingType,
    sortOrder
  }`
  
  return sanityClient.fetch<ConnectorProduct[]>(query, params)
}

/** ---------- Products by Category (cable-assemblies / adapters 等) ---------- */
export async function getProductsByCategory(categorySlug: string): Promise<ConnectorProduct[]> {
  const query = `
    *[_type == "product" && series->category->slug.current == $categorySlug] | order(sortOrder asc, title asc) {
      _id,
      title,
      "slug": slug.current,
      "seriesName": series->name,
      "imageUrl": mainImage.asset->url,
      shortDescription,
      frequencyMax,
      impedance,
      mountingType,
      sortOrder
    }
  `
  return sanityClient.fetch<ConnectorProduct[]>(query, { categorySlug })
}

/** ---------- Series by Category ---------- */
export type SeriesByCategory = {
  _id: string
  name: string
  slug: string | null
}

export async function getSeriesByCategory(categorySlug: string): Promise<SeriesByCategory[]> {
  const query = `
    *[_type == "series" && category->slug.current == $categorySlug] | order(sortOrder asc, name asc) {
      _id,
      name,
      "slug": slug.current
    }
  `
  
  return sanityClient.fetch<SeriesByCategory[]>(query, { categorySlug })
}

/** ---------- Product Detail by Slug ---------- */
/** 产品视频对象 productVideo：upload | youtube | vimeo，用于详情页播放器与 VideoObject JSON-LD。 */
export type ProductVideo = {
  videoType?: 'upload' | 'youtube' | 'vimeo' | null
  /** upload 时：videoFile.asset->url */
  videoFileUrl?: string | null
  /** youtube/vimeo 时：页面 URL */
  videoUrl?: string | null
  posterUrl?: string | null
  title?: string | null
  description?: string | null
}

export type ProductDetail = {
  _id: string
  title: string
  slug: string | null
  seriesName: string | null
  imageUrl: string | null
  shortDescription?: string | null
  frequencyMax?: number | null
  impedance?: number | null
  mountingType?: string | null
  tags?: string[] | null
  /** 技术参数，来自 Sanity product.specs */
  specs?: { label: string; value: string }[] | null
  productVideo?: ProductVideo | null
  /** ISO 日期，用于 VideoObject uploadDate */
  createdAt?: string | null
  updatedAt?: string | null
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const query = `
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      "seriesName": series->name,
      "imageUrl": mainImage.asset->url,
      shortDescription,
      frequencyMax,
      impedance,
      mountingType,
      tags,
      specs,
      "productVideo": {
        "videoType": productVideo.videoType,
        "videoFileUrl": productVideo.videoFile.asset->url,
        "videoUrl": productVideo.videoUrl,
        "posterUrl": productVideo.poster.asset->url,
        "title": productVideo.title,
        "description": productVideo.description
      },
      "createdAt": _createdAt,
      "updatedAt": _updatedAt
    }
  `
  
  const product = await sanityClient.fetch<ProductDetail | null>(query, { slug })
  if (!product) return null
  if (!product.specs?.length && (product.seriesName || product.title)) {
    product.specs = getSpecsForSeries(product.seriesName ?? null, product.title ?? '')
  }
  return product
}

/** ---------- Catalog 产品目录下载文件 ---------- */
/** 从 siteSettings 或 settings 单例中的文件字段取 url 与文件名。若 Studio 中类型/字段名不同，请把 _type 与字段名改为实际 schema。常见字段：catalogFile / productCatalog / catalog。 */
export type CatalogFile = {
  fileUrl: string | null
  fileName: string | null
}

const CATALOG_QUERY = `
*[_type in ["siteSettings", "settings"]][0] {
  "fileUrl": coalesce(catalogFile.asset->url, productCatalog.asset->url, catalog.asset->url),
  "fileName": coalesce(catalogFile.asset->originalFilename, productCatalog.asset->originalFilename, catalog.asset->originalFilename)
}
`

export async function getCatalogFile(): Promise<CatalogFile> {
  const raw = await sanityClient.fetch<{ fileUrl?: string | null; fileName?: string | null }>(CATALOG_QUERY)
  if (!raw) return { fileUrl: null, fileName: null }
  return {
    fileUrl: raw.fileUrl ?? null,
    fileName: raw.fileName ?? null,
  }
}
