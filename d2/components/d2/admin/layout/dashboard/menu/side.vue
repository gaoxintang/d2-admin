<template>
  <a-menu
    mode="inline"
    :selected-keys="selectedKeys"
    :open-keys="openKeys"
    :inline-indent="inlineIndent"
    :inline-collapsed="collapsed"
    @select="onSelect"
  >
    <d2-admin-layout-dashboard-menu-render
      v-for="menu of menus"
      :key="getMenuId(menu)"
      :menu="menu"
    />
  </a-menu>
</template>

<script>
import { computed, unref } from 'vue'
import { useRoute } from 'vue-router'
import { useCssVar } from '@vueuse/core'
import { compact } from 'lodash-es'
import { storeToRefs } from 'pinia'
import { makeNameByUrl } from 'd2/utils/framework/component.js'
import { convertCssUnit } from 'd2/utils/browser/css.js'
import { useD2AdminMenuMainStore } from 'd2/store/menu-main.js'
import { useMenu } from 'd2/use/menu.js'
import { getMenuId } from 'd2/utils/framework/menu.js'
import { useD2AdminLayoutDashboardStore } from 'd2/components/d2/admin/layout/dashboard/store/index.js'

export default {
  name: makeNameByUrl(import.meta.url),
  setup () {
    const route = useRoute()

    const menu = useMenu()
    const { navigateByMenu } = menu

    const menuStore = useD2AdminMenuMainStore()
    const { menus } = storeToRefs(menuStore)
    const { getMenuById, getMenuByUrl, getMenuPids } = menuStore

    const d2AdminLayoutDashboardStore = useD2AdminLayoutDashboardStore()
    const { collapsed } = storeToRefs(d2AdminLayoutDashboardStore)

    function onSelect ({ key }) {
      navigateByMenu(getMenuById(key))
    }

    const selectedKey = computed(() => getMenuId(getMenuByUrl(route.fullPath)))

    const selectedKeys = computed(() => compact([selectedKey.value]))

    const openKeys = computed(() => {
      if (unref(collapsed)) return []
      return getMenuPids(selectedKey.value)
    })

    const inlineIndent = computed(() => {
      // Keep the same calculation rules as in CSS
      const itemLineHeight = convertCssUnit(useCssVar('--d2-admin-layout-dashboard-item-line-height'))
      const itemFontSize = convertCssUnit(useCssVar('--d2-admin-layout-dashboard-item-font-size'))
      return (itemLineHeight - itemFontSize) / 2
    })

    return {
      menus,
      onSelect,
      selectedKeys,
      openKeys,
      getMenuId,
      collapsed,
      inlineIndent
    }
  }
}
</script>
