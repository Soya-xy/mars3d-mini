import type { Map } from 'mars3d'
interface Pipe {
  id: number
  weather: string
  longitude: number
  latitude: number
  addr: string
  name: string
  station: string
  time: string
  stake: number
  type: string
}

export const title = ref('测试')
export const config = ref<{
  cameraServer?: Record<'ip' | 'xid', any>[]
  pipeList?: Pipe[]
  city?: number
}>({})

export function useMap() {
  let map: Map = null
  function uMap(e) {
    map = e
  }
  function getMap() {
    return map
  }
  return { getMap, uMap }
}
