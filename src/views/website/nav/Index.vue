<template>
  <!-- Query area -->
  <ElForm :model="queryForm" ref="queryFormRef" label-width="70px" inline @keyup.enter="pageNavs">
    <ElFormItem prop="name" label="导航名称">
      <ElInput v-model="queryForm.name" placeholder="请输入导航名称" clearable />
    </ElFormItem>
    <ElFormItem prop="type" label="导航类型">
      <ElSelect v-model="queryForm.type" placeholder="请选择导航类型" clearable>
        <ElOption label="前端" value="0" />
        <ElOption label="后端" value="1" />
        <ElOption label="其他" value="2" />
      </ElSelect>

      <ElButton type="primary" size="small" @click="pageNavs" ml-4> 查询 </ElButton>
      <ElButton type="info" size="small" @click="queryFormRef.resetFields()"> 重置 </ElButton>
    </ElFormItem>
  </ElForm>

  <div flex="~ justify-between" my-2>
    <b ml--4> 查询结果 </b>
    <div>
      <ElButton type="primary" size="small" @click="dialog.add = true"> 新增 </ElButton>
      <ElPopconfirm
        v-if="multipleSelection.length > 0"
        title="确认删除吗？"
        confirm-button-type="info"
        confirm-button-text="取消"
        cancel-button-type="danger"
        cancel-button-text="删除"
        @cancel="batchDeleteNavs(multipleSelection)"
      >
        <template #reference>
          <ElButton type="danger" size="small"> 批量删除 </ElButton>
        </template>
      </ElPopconfirm>
    </div>
  </div>

  <!-- Result area -->
  <ElTable :data="navs" max-height="430px" @selection-change="handleSelectionChange">
    <ElTableColumn type="selection" />
    <ElTableColumn prop="name" label="名称" align="center" min-width="120px" />
    <ElTableColumn prop="link" label="链接" align="center" min-width="120px">
      <template #default="{ row }">
        <a :href="row.link" style="color: var(--text-accent)"> {{ row.link }} </a>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="icon" label="图标" align="center" min-width="55px">
      <template #default="{ row }">
        <img :src="row.icon" h-6 w-6 />
      </template>
    </ElTableColumn>
    <ElTableColumn prop="type" label="类型" align="center" min-width="65px">
      <template #default="{ row }">
        <ElTag v-if="row.type === '0'" effect="dark" type="info" size="small"> 前端 </ElTag>
        <ElTag v-else-if="row.type === '1'" effect="dark" type="info" size="small"> 后端 </ElTag>
        <ElTag v-else-if="row.type === '2'" effect="dark" type="info" size="small"> 其他 </ElTag>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="createTime" label="创建时间" align="center" min-width="105px" />

    <ElTableColumn fixed="right" label="操作" align="center" min-width="135px">
      <template #default="{ row }">
        <ElButton type="primary" size="small" @click="updateNav(row)"> 编辑 </ElButton>
        <ElPopconfirm
          title="确认删除吗？"
          confirm-button-type="info"
          confirm-button-text="取消"
          cancel-button-type="danger"
          cancel-button-text="删除"
          @cancel="batchDeleteNavs(row.id)"
        >
          <template #reference>
            <ElButton type="danger" size="small"> 删除 </ElButton>
          </template>
        </ElPopconfirm>
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

  <NavAdd :dialog="dialog" @pageNavs="pageNavs" />
  <NavUpdate :dialog="dialog" @pageNavs="pageNavs" :updateRow="updateRow" />
</template>

<script setup lang="ts">
import NavAdd from './NavAdd.vue';
import NavUpdate from './NavUpdate.vue';
import { Nav } from './nav';
import { stringify } from 'qs';

const queryForm = reactive({
  name: '',
  type: '',
});
const queryFormRef = ref();
const pagination = reactive({
  current: 1,
  size: 10,
  total: 10,
});
const dialog = reactive({
  add: false,
  update: false,
});

const multipleSelection = ref([] as string[]);
function handleSelectionChange(selection: any[]) {
  multipleSelection.value = selection.map((select: any) => select.id);
}

const navs = ref([] as Nav[]);
function pageNavs() {
  let params = stringify({
    name: queryForm.name,
    type: queryForm.type,
    currentPage: pagination.current,
    pageSize: pagination.size,
  });

  request
    .get('/fan/nav/pageNavs?' + params)
    .then((res) => {
      navs.value = res.data.records;
      pagination.total = res.data.total;
      pagination.current = res.data.current;
      pagination.size = res.data.size;
    })
    .catch((error) => {
      ElMessage.error(error.message);
    });
}
pageNavs();

function handleCurrentChange() {
  pageNavs();
}

const updateRow = ref({} as Nav);
function updateNav(row: Nav) {
  dialog.update = true;
  updateRow.value = row;
}

function batchDeleteNavs(id: string | string[]) {
  request
    .delete('/fan/nav/batchDeleteNavs/' + id)
    .then((res: any) => {
      if (200 === res.code) {
        ElMessage.success('删除成功');
        pageNavs();
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
