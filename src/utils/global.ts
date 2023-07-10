abstract class GlobalUtils {
    public static jumpToGithub() {
        window.open('https://github.com/lopo12123', '_blank')
    }

    public static quit() {
        const q = confirm('确认退出?')
        if (q) window.close()
    }
}

export {
    GlobalUtils
}