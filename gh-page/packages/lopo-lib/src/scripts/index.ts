import {getCurrentInstance} from "vue";
import {ElMessage} from "element-plus";

/**
 * @description 封装el-message, 每次显示前先关闭已有的弹窗
 */
const customMessage = (): typeof ElMessage=> {
    return getCurrentInstance()?.appContext.config.globalProperties.$message ?? ElMessage
}

/**
 * @description 平滑滚动到目标元素位置
 * @param id 目标元素的id
 */
const smoothScrollById = (id: string) => {
    document.getElementById(id)?.scrollIntoView({block: "start", inline: "nearest", behavior: 'smooth'})
}

export {
    customMessage,
    smoothScrollById
}