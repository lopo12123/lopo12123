class Misc {
    public static readBlobAsDataUrl(blob: Blob) {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                resolve(reader.result as string)
            }
            reader.onerror = (e) => {
                reject(e)
            }
            reader.readAsDataURL(blob)
        })
    }

}

export {
    Misc
}