import {
    HTMLAttributes,
    ReactNode,
    RefObject,
    useEffect,
    useRef,
    useState
} from "react";

// region 接口
/**
 * @description SpaConverter 的入参
 */
export interface SpaConverterProp extends HTMLAttributes<HTMLElement> {
    // 子应用加载路径
    path: string
    // 传递给子应用的参数
    deepProps?: Record<string, any>
    // 加载状态的展示内容
    loadingDisplay?: ReactNode
    // 错误状态的展示内容
    errorDisplay?: (msg: string) => ReactNode
}

/**
 * @description 子应用的生命周期方法
 * @example
 * 调用 subSpaInstance.mount() 以挂载子应用
 * 调用 subSpaInstance.render() 以绘制子应用
 * 调用 subSpaInstance.unmount() 以卸载子应用
 */
export interface SpaMethod {
    mount?: (props: any) => void
    render?: (props: any) => ReactNode
    unmount?: () => void
}

/**
 * @description import('path-to-sub-spa').then(spa: SpaModule)
 */
export interface SpaModule {
    default: (container: HTMLDivElement | null) => SpaMethod
}

// endregion

// region 内部方法
/**
 * @description Makes it possible to get the path of the sub-application asynchronously
 */
const loadSpaModule = (path: string | (() => Promise<string>)): Promise<SpaModule> => {
    if(typeof path === 'string') {
        return import( /** @vite-ignore */ `${ path }`)
    }
    else if(typeof path === 'function') {
        return path().then((realPath) => {
            return import( /** @vite-ignore */ `${ realPath }`)
        })
    }
    else {
        return Promise.reject('Type Error: path of spa.')
    }
}

/**
 * @description 加载子应用后进行检查 (正确 - 返回子模块生命周期方法; 错误 - 抛出错误信息)
 */
const spaModuleCheck = (spaModule: SpaModule, containerRef: RefObject<HTMLDivElement>): Promise<SpaMethod> => {
    if(typeof spaModule.default !== 'function') return Promise.reject(`[SubSpa] 导出格式错误, 缺失必要的 'default' 导出.`)
    else {
        const _spa = spaModule.default(containerRef.current) as SpaMethod

        if(!_spa.mount && !_spa.render) return Promise.reject(`[SubSpa] 'mount' 和 'render' 方法同时缺失, 需要至少一项不为空.`)
        else if(_spa.mount && !_spa.unmount) return Promise.reject(`[SubSpa] 'unmount' 方法缺失, 当 'mount' 方法非空时, 'unmount' 方法为必须项.`)
        else return Promise.resolve(_spa)
    }
}

// endregion

export function SpaConverter_React({ path, deepProps, loadingDisplay, errorDisplay, ...props }: SpaConverterProp) {
    // 子应用容器
    const containerRef = useRef<HTMLDivElement>(null)
    // 子应用配置
    const spaMethodRef = useRef<SpaMethod>()
    // converter加载状态
    const [ converterLoading, setConverterLoading ] = useState<boolean>(true)
    // 错误信息
    const [ errMsg, setErrMsg ] = useState<string>()

    // 仅执行一次 once
    useEffect(() => {
        // 加载子应用
        loadSpaModule(path)
            .then((spaModule) => spaModuleCheck(spaModule, containerRef))
            .then((spaMethod) => {
                // 子应用有 'mount' 方法 - 渲染子应用
                if(!!spaMethod.mount) {
                    setConverterLoading(false)  // converter准备就绪
                    spaMethodRef.current = spaMethod
                    spaMethod.mount(deepProps)  // 渲染子应用
                }
                // 子应用无 'mount' 方法 - 仅更新子应用ref
                else {
                    setConverterLoading(false)
                    spaMethodRef.current = spaMethod
                }
            })
            .catch((err) => {
                setErrMsg(err.toString)  // 更新错误信息
                setConverterLoading(false)  // 取消加载状态
            })
        // Effect 清除 - 即加载新的子应用前卸载上一个应用
        return () => {
            const spaMethod = spaMethodRef.current
            if(!!spaMethod && spaMethod.unmount) spaMethod.unmount()
        }
    }, [])

    // 暂存当前的子应用方法
    const spa = spaMethodRef.current

    // 返回子应用的容器
    return (
        <div ref={ containerRef } { ...props }>
            {
                errMsg
                    ? errorDisplay
                        ? errorDisplay(errMsg)
                        : errMsg
                    : converterLoading
                        ? loadingDisplay
                            ? loadingDisplay
                            : '[Sub Spa] Converter is preparing.'
                        : (spa && spa.render)
                            ? spa.render(deepProps)
                            : '[Sub Spa] Sub-app has no content.'
            }
        </div>
    )
}