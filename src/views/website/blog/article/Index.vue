<template>
  <!-- Query area -->
  <ElForm :model="queryForm" ref="queryFormRef" label-width="70px" inline @keyup.enter="pageArticles">
    <ElFormItem prop="title" label="文章标题">
      <ElInput v-model="queryForm.title" placeholder="请输入文章标题" clearable />
    </ElFormItem>
    <ElFormItem prop="categoryId" label="文章分类">
      <ElSelect v-model="queryForm.categoryId" placeholder="请选择文章分类" clearable>
        <ElOption v-for="category in categories" :key="category.id" :label="category.name" :value="category.id" />
      </ElSelect>

      <ElButton type="primary" size="small" @click="pageArticles" ml-4> 查询 </ElButton>
      <ElButton type="info" size="small" @click="queryFormRef.resetFields()"> 重置 </ElButton>
    </ElFormItem>
  </ElForm>

  <div flex="~ justify-between" my-2>
    <b ml--4> 查询结果 </b>
    <div>
      <RouterLink to="/article/add">
        <ElButton type="primary" size="small"> 新增 </ElButton>
      </RouterLink>
      <ElButton type="primary" size="small" @click="exportArticles" ml-3> 导出 </ElButton>
      <ElButton type="danger" size="small" @click="cleanInvalidImages"> 清理图片 </ElButton>
      <ElPopconfirm
        v-if="multipleSelection.length > 0"
        title="确认删除吗？"
        confirm-button-type="info"
        confirm-button-text="取消"
        cancel-button-type="danger"
        cancel-button-text="删除"
        @cancel="batchDeleteArticles(multipleSelection)"
      >
        <template #reference>
          <ElButton type="danger" size="small"> 批量删除 </ElButton>
        </template>
      </ElPopconfirm>
    </div>
  </div>

  <!-- Result area -->
  <ElTable :data="articles" max-height="430px" @selection-change="handleSelectionChange">
    <ElTableColumn type="selection" />
    <ElTableColumn prop="title" label="标题" align="center" min-width="240px" />
    <ElTableColumn prop="cover" label="封面" align="center" min-width="90px">
      <template #default="{ row }">
        <img :src="row.cover" h-10 w-16 rd-1 />
      </template>
    </ElTableColumn>
    <ElTableColumn prop="flag" label="状态" align="center" min-width="65px">
      <template #default="{ row }">
        <ElTag v-if="row.flag === 'Y'" effect="dark" type="success" size="small"> 正常 </ElTag>
        <ElTag v-else-if="row.flag === 'N'" effect="dark" type="danger" size="small"> 禁用 </ElTag>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="createTime" label="创建时间" align="center" min-width="105px" />

    <ElTableColumn fixed="right" label="操作" align="center" min-width="195px">
      <template #default="{ row }">
        <ElButton type="primary" size="small" @click="updateArticle(row)"> 编辑 </ElButton>
        <ElPopconfirm
          title="确认删除吗？"
          confirm-button-type="info"
          confirm-button-text="取消"
          cancel-button-type="danger"
          cancel-button-text="删除"
          @cancel="batchDeleteArticles(row.id)"
        >
          <template #reference>
            <ElButton type="danger" size="small"> 删除 </ElButton>
          </template>
        </ElPopconfirm>
        <ElButton type="primary" size="small" @click="previewArticle(row.id)"> 预览 </ElButton>
      </template>
    </ElTableColumn>
  </ElTable>

  <ElPagination
    layout="total, prev, pager, next"
    v-model:current-page="pagination.current"
    :page-size="pagination.size"
    :total="pagination.total"
    @current-change="handleCurrentChange"
    :pager-count="5"
    hide-on-single-page
    background
    small
    mt-4
  />
</template>

<script setup lang="ts">
import { Category } from '../category/category';
import { Article } from './article';
import { stringify } from 'qs';

const queryForm = reactive({
  title: '',
  categoryId: '',
});
const queryFormRef = ref();
const pagination = reactive({
  current: 1,
  size: 10,
  total: 10,
});

const multipleSelection = ref([] as string[]);
function handleSelectionChange(selection: any[]) {
  multipleSelection.value = selection.map((select: any) => select.id);
}

const categories = ref([] as Category[]);
function listCategories() {
  request
    .get('/fan/blog/category/listCategories')
    .then((res) => {
      categories.value = res.data;
    })
    .catch((error) => {
      ElMessage.error(error.message);
    });
}
listCategories();

const articles = ref([] as Article[]);
function pageArticles() {
  let params = stringify({
    title: queryForm.title,
    categoryId: queryForm.categoryId,
    currentPage: pagination.current,
    pageSize: pagination.size,
  });

  request
    .get('/fan/blog/article/pageArticles?' + params)
    .then((res) => {
      articles.value = res.data.records;
      pagination.total = res.data.total;
      pagination.current = res.data.current;
      pagination.size = res.data.size;
    })
    .catch((error) => {
      ElMessage.error(error.message);
    });
}
pageArticles();

function handleCurrentChange() {
  pageArticles();
}

function updateArticle(row: Article) {
  window.open('/article/update/' + row.id, '_blank');
}

function previewArticle(id: string) {
  window.open('/article/preview/' + id, '_blank');
}

function batchDeleteArticles(id: string | string[]) {
  request
    .delete('/fan/blog/article/batchDeleteArticles/' + id)
    .then((res: any) => {
      if (200 === res.code) {
        ElMessage.success('删除成功');
        pageArticles();
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch((error) => {
      ElMessage.error(error.message);
    });
}

function cleanInvalidImages() {
  request
    .get('/fan/blog/article/cleanInvalidImages')
    .then((res: any) => {
      if (200 === res.code) {
        ElMessage.success('清理成功，共清理 ' + res.data + ' 张图片');
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch((error) => {
      ElMessage.error(error.message);
    });
}

function exportArticles() {
  if (multipleSelection.value.length === 0) {
    location.href = '/fan/blog/article/exportAllArticles?token=' + localStorage.getItem('token');
  } else {
    location.href =
      '/fan/blog/article/batchExportArticles/' + multipleSelection.value + '?token=' + localStorage.getItem('token');
  }
}
</script>

<style scoped lang="scss">
.el-form {
  .el-form-item {
    margin: 0.5rem 1rem 0.5rem 0;
  }

  .el-input,
  .el-select {
    width: 200px;
  }
}

@media (max-width: 768px) {
  .el-form .el-input,
  .el-form .el-select {
    width: 100px;
  }
}
</style>
