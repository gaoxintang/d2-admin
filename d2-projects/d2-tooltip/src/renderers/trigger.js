import {
  cloneVNode
} from 'vue'

import {
  getFirstValidNode
} from 'd2-projects/d2-utils/vnode.js'

export function renderTrigger (trigger, extraProps) {
  const firstElement = getFirstValidNode(trigger, 1)
  if (!firstElement) console.log('renderTrigger', 'trigger expects single rooted node')
  return cloneVNode(firstElement, extraProps, true)
}
