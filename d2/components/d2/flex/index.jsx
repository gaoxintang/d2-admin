import joinClassNames from 'classnames'
import { defineComponent, unref, computed } from 'vue'
import { pickBy, isUndefined } from 'lodash-es'
import { isNumberLike } from 'd2/utils/lang/number.js'
import { makeName, makeClassName } from 'd2/utils/framework/component.js'
import { isFlexProp } from 'd2/utils/const/flex.js'

const name = 'flex'

export const componentName = makeName(name)
export const classname = makeClassName(name)

export default defineComponent({
  name: componentName,
  props: {
    // display
    inlineFlex: { type: Boolean },
    block: { type: Boolean },
    inline: { type: Boolean },
    inlineBlock: { type: Boolean },
    // flex parent attributes
    wrap: { type: Boolean },
    wrapR: { type: Boolean },
    dir: { type: String, default: '', validator: value => isFlexProp('dir', value, true) },
    main: { type: String, default: '', validator: value => isFlexProp('main', value, true) },
    cross: { type: String, default: '', validator: value => isFlexProp('cross', value, true) },
    box: { type: String, default: '', validator: value => isFlexProp('box', value, true) },
    content: { type: String, default: '', validator: value => isFlexProp('content', value, true) },
    // flex child attributes
    order: { type: [String, Number], validator: value => isNumberLike(value) },
    grow: { type: [String, Number], validator: value => isNumberLike(value) },
    shrink: { type: [String, Number], validator: value => isNumberLike(value) },
    self: { type: String, default: '', validator: value => isFlexProp('self', value, true) },
    // helper
    center: { type: Boolean },
    tag: { type: String, default: 'div' }
  },
  setup (props) {
    const center = computed(() => props.center ? 'center' : '')
    const main = computed(() => unref(center) || props.main)
    const cross = computed(() => unref(center) || props.cross)
    const classnames = computed(() => joinClassNames(
      classname,
      {
        [`${classname}--inline-flex`]: props.inlineFlex,
        [`${classname}--block`]: props.block,
        [`${classname}--inline`]: props.inline,
        [`${classname}--inline-block`]: props.inlineBlock,
        [`${classname}--wrap`]: props.wrap,
        [`${classname}--wrap-r`]: props.wrapR,
        [`${classname}--dir-${props.dir}`]: props.dir,
        [`${classname}--main-${unref(main)}`]: unref(main),
        [`${classname}--cross-${unref(cross)}`]: unref(cross),
        [`${classname}--box-${props.box}`]: props.box,
        [`${classname}--content-${props.content}`]: props.content,
        [`${classname}--self-${props.self}`]: props.self
      }
    ))
    const style = computed(() => pickBy({
      order: props.order,
      flexGrow: props.grow,
      flexShrink: props.shrink
    }, value => !isUndefined(value)))
    return {
      classnames,
      style
    }
  },
  render () {
    const {
      classnames,
      style
    } = this
    const Tag = this.tag
    return (
      <Tag class={ classnames } style={ style }>
        { this.$slots?.default?.() }
      </Tag>
    )
  }
})
