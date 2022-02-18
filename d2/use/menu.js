import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getMenuId, getMenuTitle, getMenuIcon, getMenuUrl } from 'd2/utils/framework/menu.js'

export function useMenu () {
  const router = useRouter()

  function navigateByMenu (menu) {
    router.push(getMenuUrl(menu.url))
  }

  return {
    navigateByMenu
  }
}

export function useMenuData (menu) {
  const menuId = computed(() => getMenuId(menu))
  const menuTitle = computed(() => getMenuTitle(menu))
  const menuIcon = computed(() => getMenuIcon(menu))

  return {
    menuId,
    menuTitle,
    menuIcon
  }
}
