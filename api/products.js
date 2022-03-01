import MainApi from '@/api/endpoint'
export function getAll() {
  return MainApi.get('products.json')
}
