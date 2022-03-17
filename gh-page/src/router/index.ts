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
type ToolName = 'Image Parser'
const ToolNameList: ToolName[] = [
    'Image Parser'
]
const navigateToTool = (navigate: NavigateFunction, which: ToolName) => {
    navigate(`/tool/${which.replace(/[ ]/g, '-').toLowerCase()}`)
}
// endregion

// region misc
type MiscItem = 'Zt'
const MiscItemList: MiscItem[] = [
    'Zt'
]
// endregion

export {
    SubAppNameList,
    navigateToSubApp,

    ToolNameList,
    navigateToTool

    //
}