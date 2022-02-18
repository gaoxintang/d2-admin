<template>
  <a-menu-item :key="menuId">
    <template v-if="menuIcon" #icon>
      <d2-icon :name="menuIcon"/>
    </template>
    {{ menuTitle }}
  </a-menu-item>
</template>

<script>
import { makeNameByUrl } from 'd2/utils/framework/component.js'
import { defineComponent } from 'vue'
import { useMenuData } from 'd2/use/menu.js'

export default defineComponent({
  name: makeNameByUrl(import.meta.url),
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const { menu } = props

    const { menuId, menuTitle, menuIcon } = useMenuData(menu)

    return {
      menuId,
      menuTitle,
      menuIcon
    }
  }
})
</script>
