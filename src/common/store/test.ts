/**
 * store 状态管理
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2022-02-19
 */
import type { Store } from 'vuex'
import { createStore } from 'vuex'
import type { InjectionKey } from 'vue'

export interface Test {
  count?: number
}

export const key: InjectionKey<Store<Test>> = Symbol('test')

export const store = createStore<Test>({
  state: {
    count: 0,
  },
})
