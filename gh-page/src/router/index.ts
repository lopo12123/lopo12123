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
type ToolName = 'tool1'
const ToolNameList: ToolName[] = [
    'tool1'
]
const navigateToTool = (navigate: NavigateFunction, which: ToolName) => {
    console.log(`to: ${ which }`)
}
// endregion

export {
    SubAppNameList,
    navigateToSubApp,
    ToolNameList,
    navigateToTool
}