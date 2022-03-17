import { useNavigate } from "react-router-dom";

const navigateToMisc = () => {

}

// region sub-app
type SubAppName = "vite-react-ts" | "vite-vue-ts"
const SubAppNameList: SubAppName[] = [
    "vite-react-ts",
    "vite-vue-ts"
]

/**
 * @description navigate to sub-app
 */
const navigateToSubApp = (which: SubAppName) => {
    const navigate = useNavigate()

    navigate(`/sub-app/${ which }`)
}
// endregion

// region
const navigateToTools = (which: string) => {
    console.log(`to: ${ which }`)
}
// endregion

export {
    SubAppNameList,
    navigateToSubApp
}