import { get, pick } from 'lodash-es'
import { Menu } from 'd2/utils/menu.js'
import { flattenObjectArray } from 'd2/utils/array.js'
import routes from 'virtual:generated-pages'

export const dashboardIndexMenu = new Menu('控制台')
  .url('/dashboard')
  .icon('icon-park-outline:dashboard')

export const indexMenu = new Menu('首页')
  .url('/')
  .icon('icon-park-outline:home')

export const dashboardDemoComponentScrollMenus = new Menu('滚动')
  .scope('/dashboard/demo/component/scroll')
  .icon('icon-park-outline:move')
  .add(new Menu('概览').index())
  .add(new Menu('基础').url('/base'))

export const dashboardDemoComponentSvgMenus = new Menu('SVG')
  .icon('icon-park-outline:pic-one')
  .scope('/dashboard/demo/component/svg')
  .add(new Menu('概览').index())
  .add(new Menu('基础').url('/base'))
  .add(new Menu('尺寸').url('/size'))

export const dashboardDemoComponentIconMenus = new Menu('图标')
  .icon('icon-park-outline:emotion-happy')
  .scope('/dashboard/demo/component/icon')
  .add(new Menu('概览').index())
  .add(new Menu('基础').url('/base'))

export const dashboardDemoComponentBreakPointMenus = new Menu('断点')
  .icon('icon-park-outline:distribute-horizontally')
  .scope('/dashboard/demo/component/break-point')
  .add(new Menu('概览').index())
  .add(new Menu('基础').url('/base'))
  .add(new Menu('data').url('/data'))

const flatRoutes = flattenObjectArray(
  routes,
  'children',
  (item, _) => pick(item, ['name', 'path', 'meta'])
)

function filterRoutes (rule) {
  return flatRoutes.filter(route => rule.test(route.name))
}

function creatRouteMenu (route, basePath) {
  const url = route.path.replace(RegExp(`^${basePath}`), '')
  const title = get(route.meta, 'd2admin.menu.title', url)
  if (!url) {
    return new Menu(title).index()
  }
  return new Menu(title).url(url)
}

function creatRouteMenus ({ match = /.+/, basePath = '' } = {}) {
  return filterRoutes(match).map(route => creatRouteMenu(route, basePath))
}

export const dashboardDemoComponentFlexMenus = new Menu('Flex')
  .icon('icon-park-outline:carousel')
  .scope('/dashboard/demo/component/flex')
  .add(creatRouteMenus({
    match: /^dashboard-demo-component-flex/,
    basePath: 'demo/component/flex'
  }))

export const dashboardDemoComponentMenus = new Menu('组件')
  .icon('icon-park-outline:components')
  .add(new Menu('概览').url('/dashboard/demo/component').icon('icon-park-outline:handle-round').index())
  .add(dashboardDemoComponentScrollMenus)
  .add(dashboardDemoComponentSvgMenus)
  .add(dashboardDemoComponentIconMenus)
  .add(dashboardDemoComponentBreakPointMenus)
  .add(dashboardDemoComponentFlexMenus)

export const dashboardDemoLayoutDashboardMenus = new Menu('LayoutDashboard')
  .icon('icon-park-outline:page')
  .scope('/dashboard/demo/layout/dashboard')
  .add(new Menu('概览').index())
  .add(new Menu('基础').url('/base'))
  .add(new Menu('absolute').url('/absolute'))
  .add(new Menu('full').url('/full'))
  .add(new Menu('page-width').url('/page-width'))
  .add(new Menu('custom').url('/custom'))

export const dashboardDemoLayoutMenus = new Menu('布局')
  .icon('icon-park-outline:page')
  .add(new Menu('概览').url('/dashboard/demo/layout').icon('icon-park-outline:handle-round').index())
  .add(dashboardDemoLayoutDashboardMenus)

export const dashboardDocumentMenus = new Menu('文档')
  .icon('icon-park-outline:doc-detail')
  .scope('/dashboard/document')
  .add([
    new Menu('doc-1').url('/page1'),
    new Menu('doc-2').url('/page2')
  ])
