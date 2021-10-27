import {
  getMenuId,
  getMenuTitle,
  getMenuIcon,
  getMenuChildren,
  hasChildren
} from 'd2/utils/menu.js'

export const renderItem = menu => (
  <el-menu-item index={ getMenuId(menu) }>
    {
      {
        title: () => getMenuTitle(menu),
        default: () => {
          const icon = getMenuIcon(menu)
          return icon ? <d2-icon name={ icon }/> : null
        }
      }
    }
  </el-menu-item>
)

export const renderSub = menu => (
  <el-sub-menu index={ getMenuId(menu) }>
    {
      {
        title: () => {
          const icon = getMenuIcon(menu)
          const title = getMenuTitle(menu)
          return [
            icon ? <d2-icon name={ icon }/> : null,
            title
          ]
        },
        default: () => getMenuChildren(menu).map(menu => renderMenu(menu))
      }
    }
  </el-sub-menu>
)

export const renderMenu = menu => (hasChildren(menu) ? renderSub : renderItem)(menu)

export const renderMenus = (
  menus = [],
  props = {}
) => (
  <el-menu {...props}>
    { menus.map(renderMenu) }
  </el-menu>
)
