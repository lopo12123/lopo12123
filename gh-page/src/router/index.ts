import { NavigateFunction } from "react-router-dom";

// region sub-app
type SubApp = 'vite-react-ts' | 'vite-vue-ts'
const SubAppNameList: SubApp[] = [
    'vite-react-ts',
    'vite-vue-ts'
]

/**
 * @description navigate to sub-app
 */
const navigateToSubApp = (navigate: NavigateFunction, which: SubApp) => {
    navigate(`/sub-app/${ which }`)
}
// endregion

// region tools
type Tools = ''
const navigateToTools = (which: string) => {
    console.log(`to: ${ which }`)
}
// endregion

export {
    SubAppNameList,
    navigateToSubApp
}