<template>
  <ElForm :model="queryForm" ref="queryFormRef" inline label-width="70px" @keyup.enter="pageWords" m="8 b-4" p-4 rd-4>
    <ElFormItem prop="en" label="英文">
      <ElAutocomplete
        v-model="queryForm.en"
        placeholder="请输入英文"
        clearable
        value-key="en"
        :debounce="0"
        :fetch-suggestions="queryEn"
        :trigger-on-focus="false"
      />
    </ElFormItem>
    <ElFormItem prop="cn" label="中文">
      <ElInput v-model="queryForm.cn" placeholder="请输入中文" clearable />
    </ElFormItem>
    <ElFormItem prop="type" label="单词状态">
      <ElSelect v-model="queryForm.type" placeholder="请选择状态" clearable>
        <ElOption label="掌握" value="0" />
        <ElOption label="熟悉" value="1" />
        <ElOption label="模糊" value="2" />
        <ElOption label="陌生" value="3" />
      </ElSelect>

      <ElButton type="primary" size="small" @click="pageWords" ml-4> 查询 </ElButton>
      <ElButton type="info" size="small" @click="queryFormRef.resetFields()"> 重置 </ElButton>
    </ElFormItem>
  </ElForm>

  <div flex="~ justify-end" mx-8>
    <ElButton
      style="background: var(--strong-gradient); color: #fff; border: none"
      @click="dialog.add = true"
      size="small"
    >
      新 增
    </ElButton>
  </div>

  <ul class="word" grid="~ gap-8" list-none m="8 t-4" p-0>
    <li v-for="word in words" relative p-4 rd-4>
      <h2 style="color: var(--text-bright)" m-0>{{ word.en }}</h2>
      <div flex="~ items-center" my-2>
        <div style="background-color: var(--background-trans)" p-2 rd-l-2>
          <div class="i-ic-baseline-keyboard-voice" h-4 w-4 />
        </div>
        <code style="background-color: var(--background-trans)" h-4 p-2 rd-r-2>{{ word.phonetic }}</code>
      </div>
      <div mb-8>{{ word.cn }}</div>

      <div absolute right-4 bottom-4>
        <ElButton type="primary" size="small" @click="updateWord(word)"> 编辑 </ElButton>
        <ElPopconfirm
          title="确认删除吗？"
          confirm-button-type="info"
          confirm-button-text="取消"
          cancel-button-type="danger"
          cancel-button-text="删除"
          @cancel="batchDeleteWords(word.id)"
        >
          <template #reference>
            <ElButton type="danger" size="small"> 删除 </ElButton>
          </template>
        </ElPopconfirm>
      </div>
    </li>
  </ul>

  <ElPagination
    layout="prev, pager, next"
    v-model:current-page="pagination.current"
    :page-size="pagination.size"
    :total="pagination.total"
    @current-change="handleCurrentChange"
    :pager-count="5"
    background
    hide-on-single-page
    flex="~ justify-center"
    m-8
  />

  <WordAdd :dialog="dialog" @pageWords="pageWords" />
  <WordUpdate :dialog="dialog" :updateRow="updateRow" @pageWords="pageWords" />
</template>

<script setup lang="ts">
import WordAdd from './WordAdd.vue';
import WordUpdate from './WordUpdate.vue';
import { Word } from './word';
import { stringify } from 'qs';

const queryForm = reactive({
  en: '',
  cn: '',
  type: '',
});
const queryFormRef = ref();
const pagination = reactive({
  current: 1,
  size: 12,
  total: 12,
});
const dialog = reactive({
  add: false,
  update: false,
});

const words = ref([] as Word[]);
function pageWords() {
  let params = stringify({
    ...queryForm,
    currentPage: pagination.current,
    pageSize: pagination.size,
  });

  request
    .get('/fan/word/pageWords?' + params)
    .then((res) => {
      words.value = res.data.records;
      pagination.current = res.data.current;
      pagination.size = res.data.size;
      pagination.total = res.data.total;
    })
    .catch((error) => {
      ElMessage.error(error.message);
    });
}
pageWords();

function handleCurrentChange() {
  pageWords();
}

let timer: NodeJS.Timeout;
function queryEn(_queryString: string, cb: any) {
  clearTimeout(timer);

  timer = setTimeout(() => {
    if (queryForm.en) {
      request
        .get('/fan/word/listWords?en=' + queryForm.en)
        .then((res) => {
          cb(res.data);
        })
        .catch((error) => {
          ElMessage.error(error.message);
        });
    }
  }, 300);
}

const updateRow = ref({} as Word);
function updateWord(row: Word) {
  dialog.update = true;
  updateRow.value = row;
}

function batchDeleteWords(id: string | string[]) {
  request
    .delete('/fan/word/batchDeleteWords/' + id)
    .then((res: any) => {
      if (200 === res.code) {
        ElMessage.success('删除成功');
        pageWords();
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch((error) => {
      ElMessage.error(error.message);
    });
}
</script>

<style scoped lang="scss">
.el-form {
  background-color: var(--background-secondary);

  .el-form-item {
    margin: 0.5rem 1rem 0.5rem 0;
  }

  .el-input,
  .el-select {
    width: 200px;
  }
}

:deep(.el-autocomplete .el-input) {
  width: 200px;
}

.word {
  grid-template-columns: repeat(3, 1fr);

  li {
    background-color: var(--background-secondary);
  }
}

@media (max-width: 992px) {
  .word {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .el-form .el-input,
  .el-form .el-select,
  :deep(.el-autocomplete .el-input) {
    width: 100px;
  }
  .word {
    grid-template-columns: 1fr;
  }
}
</style>
