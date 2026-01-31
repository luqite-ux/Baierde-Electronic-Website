import {getCategories} from '../../lib/sanity.data'

export default async function Page() {
  const categories = await getCategories()
  return (
    <div style={{padding: 24}}>
      <h1>Sanity Categories</h1>
      <pre>{JSON.stringify(categories, null, 2)}</pre>
    </div>
  )
}
