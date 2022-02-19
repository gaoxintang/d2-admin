<template>
  <d2-scroll ref="scrollbarRef" :class="bodyClass">
    <div class="main__inner" :style="mainInnerStyle">
      <slot/>
    </div>
  </d2-scroll>
  <div v-if="headerActive" ref="headerRef" :class="headerClass">
    <slot name="header"/>
  </div>
  <div v-if="footerActive" ref="footerRef" :class="footerClass">
    <slot name="footer"/>
  </div>
</template>

<script>
import { computed, onMounted, onUpdated, ref, unref, watchPostEffect } from 'vue'
import { useCssVar, useElementBounding } from '@vueuse/core'
import joinClassNames from 'classnames'
import { makeNameByUrl } from 'd2/utils/framework/component.js'
import { px, convertCssUnit } from 'd2/utils/browser/css.js'

export default {
  name: makeNameByUrl(import.meta.url),
  props: {
    headerBorder: { type: Boolean, default: false, required: false },
    footerBorder: { type: Boolean, default: false, required: false }
  },
  setup (props, { slots }) {
    const scrollbarRef = ref(null)
    const headerRef = ref(null)
    const footerRef = ref(null)

    const headerActive = ref(false)
    const footerActive = ref(false)

    const { height: bodyHeaderHeight } = useElementBounding(headerRef)
    const { height: bodyFooterHeight } = useElementBounding(footerRef)

    const cssVarHeaderHeight = computed(() => convertCssUnit(useCssVar('--d2-admin-layout-dashboard-header-height')))
    const cssVarHeaderBorderWidth = computed(() => convertCssUnit(useCssVar('--d2-admin-layout-dashboard-header-border-width')))
    const cssVarBodyPaddingY = computed(() => convertCssUnit(useCssVar('--d2-admin-layout-dashboard-body-main-padding-y')))
    const bodyTopBase = computed(() => unref(cssVarHeaderHeight) + unref(cssVarHeaderBorderWidth))
    const scrollbarVerticalTop = computed(() => unref(bodyTopBase) + unref(bodyHeaderHeight))

    const mainInnerStyle = computed(() => {
      const paddingTop = px(unref(bodyHeaderHeight) + (props.headerBorder ? unref(cssVarBodyPaddingY) : 0))
      const paddingBottom = px(unref(bodyFooterHeight) + (props.footerBorder ? unref(cssVarBodyPaddingY) : 0))
      return {
        ...(unref(headerActive) ? { paddingTop } : {}),
        ...(unref(footerActive) ? { paddingBottom } : {})
      }
    })

    const bodyClass = computed(() => joinClassNames('body__main', {
      'body__main--with-header-ghost': unref(headerActive) && !props.headerBorder,
      'body__main--with-footer-ghost': unref(footerActive) && !props.footerBorder
    }))

    const headerClass = computed(() => joinClassNames('body__header', 'layout-blur--body', {
      'body__header--border': props.headerBorder
    }))

    const footerClass = computed(() => joinClassNames('body__footer', 'layout-blur--body', {
      'body__footer--border': props.footerBorder
    }))

    function refreshSlotStatus () {
      headerActive.value = !!slots.header
      footerActive.value = !!slots.footer
      if (!unref(headerActive)) {
        bodyHeaderHeight.value = 0
      }
      if (!unref(footerActive)) {
        bodyFooterHeight.value = 0
      }
    }

    refreshSlotStatus()
    
    onUpdated(() => {
      refreshSlotStatus()
    })
    
    onMounted(() => {
      watchPostEffect(() => {
        scrollbarRef.value.scrollbarVertical.style.top = px(scrollbarVerticalTop)
      })
      watchPostEffect(() => {
        scrollbarRef.value.scrollbarVertical.style.bottom = px(bodyFooterHeight)
      })
    })

    return {
      scrollbarRef,
      headerRef,
      footerRef,
      mainInnerStyle,
      bodyClass,
      headerClass,
      footerClass,
      headerActive,
      footerActive
    }
  }
}
</script>
