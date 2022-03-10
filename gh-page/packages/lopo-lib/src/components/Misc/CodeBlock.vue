<template>
    <div class="code-block">
        <div class="code-container" ref="elRef"></div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, ref, shallowRef} from "vue";
import {basicSetup, EditorState, EditorView} from "@codemirror/basic-setup";
import {javascript} from "@codemirror/lang-javascript";
import {oneDark} from "@codemirror/theme-one-dark";

export default defineComponent({
    name: "CodeBlock",
    props: {
        docContent: {
            required: true,
            type: String
        }
    },
    setup(props) {
        const elRef = ref<HTMLDivElement | null>(null)
        const codeBlock = shallowRef<EditorView | null>(null)

        onMounted(() => {
            if(!elRef.value) return;

            codeBlock.value = new EditorView({
                parent: elRef.value!,
                state: EditorState.create({
                    doc: props.docContent,
                    extensions: [
                        basicSetup,
                        EditorState.readOnly.of(true),
                        javascript({ typescript: true }),
                        oneDark
                    ]
                })
            })
        })
        onUnmounted(() => {
            codeBlock.value?.destroy()
        })

        return {
            elRef
        }
    }
})
</script>

<style lang="scss" scoped>
@use "src/styles/mixin";

.code-block {
    @include mixin.scrollBarStyle(#acacac);
    position: relative;
    width: 100%;
    height: fit-content;
    max-height: 300px;
    overflow: auto;
}
</style>
