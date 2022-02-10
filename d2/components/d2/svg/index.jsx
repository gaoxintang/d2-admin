import makeClassnames from 'classnames'
import { defineComponent, unref, computed } from 'vue'
import { omitBy, isEmpty, isNumber } from 'lodash-es'
import { useConfig } from 'd2/components/d2/config/use.js'
import { makeName, makeClassName } from 'd2/utils/framework/component.js'
import { px } from 'd2/utils/browser/css.js'
import { warn } from 'd2/utils/framework/error.js'
import { componentName as configComponentName } from 'd2/components/d2/config/index.jsx'

const name = 'svg'

const componentName = makeName(name)
const classname = makeClassName(name)

export default defineComponent({
  name: componentName,
  props: {
    symbolId: { type: String, default: '' },
    dir: { type: String, default: '' },
    name: { type: String, default: '' },
    height: { type: [String, Number], default: '' },
    width: { type: [String, Number], default: '' },
    size: { type: [String, Number], default: '' }
  },
  setup (props) {
    const { svgSymbolId, svgDir } = useConfig()

    const symbolId = computed(() => props.symbolId || svgSymbolId)

    if (!unref(symbolId)) {
      warn(componentName, `symbolId cannot be empty, please pass the 'symbolId' prop for ${componentName} component. or wrap with ${configComponentName} component on the outer layer, and pass the 'svgSymbolId' prop for ${configComponentName} component`)
    }

    const dir = computed(() => props.dir || svgDir)

    const href = computed(() => {
      let _href = '#' + unref(symbolId)
        .replace(/\[dir\]/g, unref(dir))
        .replace(/\[name\]/g, props.name)
      if (!unref(dir)) {
        _href = _href.replace('--', '-')
      }
      return _href
    })

    const height = computed(() => {
      const value = props.height || props.size
      return isNumber(value) ? px(value) : value
    })
    const width = computed(() => {
      const value = props.width || props.size
      return isNumber(value) ? px(value) : value
    })

    const style = computed(() => omitBy({
      height: unref(height),
      width: unref(width)
    }, isEmpty))

    const classnames = computed(() => makeClassnames(classname, {}))

    return {
      style,
      classnames,
      href
    }
  },
  render () {
    const {
      style,
      classnames,
      href
    } = this
    return (
      <svg
        class={ classnames }
        style={ style }
        aria-hidden="true"
      >
        <use xlink:href={ href }/>
      </svg>
    )
  }
})
