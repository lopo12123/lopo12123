import { NavigateFunction } from "react-router-dom";

// region sub-app
type SubAppName = 'vite-react-ts' | 'vite-vue-ts'
const SubAppNameList: SubAppName[] = [
    'vite-react-ts',
    'vite-vue-ts'
]

/**
 * @description navigate to sub-app
 */
const navigateToSubApp = (navigate: NavigateFunction, which: SubAppName) => {
    navigate(`/sub-app/${ which }`)
}
// endregion

// region tools
interface ToolName {
    label: 'Image Parser'
    icon: string
    path: 'image-parser'
}
const ToolNameList: ToolName[] = [
    { label: 'Image Parser', icon: 'pi pi-images', path: 'image-parser' }
]
const navigateToTool = (navigate: NavigateFunction, which: ToolName['path']) => {
    navigate(`/tool/${which}`)
}
// endregion

// region misc
interface MiscItem {
    label: 'zt'
    icon: string
    path: 'zt'
}
const MiscItemList: MiscItem[] = [
    { label: 'zt', icon: 'pi pi-bolt', path: 'zt' }
]
const navigateToMisc = (navigate: NavigateFunction, which: MiscItem['path']) => {
    console.log('to misc: ', which)
}
// endregion

export {
    SubAppNameList,
    navigateToSubApp,

    ToolNameList,
    navigateToTool,

    MiscItemList,
    navigateToMisc
}