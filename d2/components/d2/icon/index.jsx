import joinClassNames from 'classnames'
import { defineComponent, ref, unref, computed, watch, onMounted, nextTick, onBeforeUpdate } from 'vue'
import iconify from '@iconify/iconify'
import { clearElement } from 'd2/utils/browser/dom.js'
import { useConfig } from 'd2/components/d2/config/use.js'
import { makeName, makeClassName } from 'd2/utils/framework/component.js'

const name = 'icon'

const componentName = makeName(name)
const className = makeClassName(name)

export default defineComponent({
  name: componentName,
  props: {
    collection: { type: String, default: '' },
    name: { type: String, default: '' }
  },
  setup (props) {
    const wrapper = ref(null)

    const { iconCollection } = useConfig()

    const collection = computed(() => props.collection || iconCollection)

    const iconName = computed(() => {
      // like collection:icon
      if (props.name.indexOf(':') > 0) return props.name
      // The icon name does not contain the icon collection name
      // Try to get it from another way
      return unref(collection) ? `${unref(collection)}:${props.name}` : props.name
    })

    async function load () {
      clearElement(unref(wrapper))
      await nextTick()
      if (!unref(wrapper)) return
      const svg = iconify.renderSVG(unref(iconName), {})
      if (svg) {
        unref(wrapper).appendChild(svg)
      } else {
        const span = document.createElement('span')
        span.className = 'iconify'
        span.dataset.icon = unref(iconName)
        unref(wrapper).appendChild(span)
      }
    }

    const classNames = computed(() => joinClassNames(className, {}))

    onMounted(load)
    onBeforeUpdate(() => {
      wrapper.value = null
    })
    watch(() => props.collection, load, { flush: 'post' })
    watch(() => props.name, load, { flush: 'post' })

    return {
      wrapper,
      classNames
    }
  },
  render () {
    const {
      classNames
    } = this
    return (
      <span class={ classNames } ref="wrapper"/>
    )
  }
})
