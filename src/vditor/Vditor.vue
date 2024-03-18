<template>
  <div id="vditor" />
</template>

<script setup lang="ts">
import Vditor from 'vditor';
import 'vditor/dist/index.css';

const props = defineProps(['form']);
const vditor = ref();

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    height: 'calc(100vh - 3rem)',
    placeholder: '请输入内容',
    tab: '    ',
    theme: 'dark',
    icon: 'material',
    toolbar: [
      'emoji',
      'headings',
      'bold',
      'italic',
      'strike',
      '|',
      'line',
      'quote',
      'list',
      'ordered-list',
      'check',
      'outdent',
      'indent',
      'code',
      'inline-code',
      'insert-after',
      'insert-before',
      'upload',
      'link',
      'table',
      'record',
      'edit-mode',
      'both',
      'preview',
      'fullscreen',
      'outline',
      'code-theme',
      'content-theme',
      'export',
      {
        name: 'save',
        icon: '<svg viewBox="0 0 1536 1536"><path fill="currentColor" d="M384 1408h768v-384H384v384zm896 0h128V512q0-14-10-38.5t-20-34.5l-281-281q-10-10-34-20t-39-10v416q0 40-28 68t-68 28H352q-40 0-68-28t-28-68V128H128v1280h128V992q0-40 28-68t68-28h832q40 0 68 28t28 68v416zM896 480V160q0-13-9.5-22.5T864 128H672q-13 0-22.5 9.5T640 160v320q0 13 9.5 22.5T672 512h192q13 0 22.5-9.5T896 480zm640 32v928q0 40-28 68t-68 28H96q-40 0-68-28t-28-68V96q0-40 28-68T96 0h928q40 0 88 20t76 48l280 280q28 28 48 76t20 88z" /></svg>',
        tip: '保存',
        tipPosition: 'n',
        hotkey: '⌘s',
        click() {
          props.form.content = vditor.value.getValue();

          request
            .post('/fan/blog/article/saveArticle', props.form)
            .then((res: any) => {
              if (res.code === 200) {
                ElMessage.success('保存成功');
                props.form.id = res.data;
              } else {
                ElMessage.error(res.message);
              }
            })
            .catch(() => {});
        },
      },
      {
        name: 'more',
        toolbar: ['undo', 'redo', 'devtools', 'info', 'help'],
      },
    ],
    counter: {
      enable: true,
    },
    cache: {
      enable: false,
    },
    preview: {
      hljs: {
        lineNumber: true,
        style: 'dracula',
      },
      markdown: {
        autoSpace: true,
        fixTermTypo: true,
      },
      theme: {
        current: 'dark',
      },
      math: {
        inlineDigit: true,
        engine: 'MathJax',
      },
      actions: [],
    },
    outline: {
      enable: true,
      position: 'right',
    },
    after: () => {
      if (props.form.content) {
        vditor.value.setValue(props.form.content);
      }
    },
  });
});

defineExpose({
  vditor,
});
</script>

<style lang="scss">
.vditor {
  --toolbar-height: 2.5rem;
  --border-color: var(--border-color-normal);
  --toolbar-background-color: var(--background-primary);
  --panel-background-color: var(--background-secondary);
  --textarea-background-color: var(--background-secondary);

  --toolbar-icon-color: var(--text-normal);
  --toolbar-icon-hover-color: var(--text-accent);
  --textarea-text-color: var(--text-normal);
  --second-color: var(--text-dim);

  .vditor-reset {
    color: var(--text-normal);

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: var(--text-bright);
    }
  }
}
</style>
