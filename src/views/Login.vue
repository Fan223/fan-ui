<template>
  <div>
    <ElDialog
      v-model="loginDialog"
      style="border-radius: 1rem; padding: 1.5rem"
      width="380px"
      :lock-scroll="false"
      :close-on-click-modal="false"
      @close="loginFormRef.resetFields()"
    >
      <h2 style="color: var(--text-normal)" m="t-0 b-4" text-center>登录</h2>

      <ElForm :model="loginForm" ref="loginFormRef" @keyup.enter="login">
        <ElFormItem prop="username">
          <ElInput v-model="loginForm.username" placeholder="用户名" clearable />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput v-model="loginForm.password" placeholder="密码" show-password clearable />
        </ElFormItem>
        <ElFormItem prop="captcha">
          <ElInput v-model="loginForm.captcha" placeholder="验证码" clearable />
        </ElFormItem>
      </ElForm>

      <template #footer>
        <ElButton style="background-color: var(--text-accent); color: var(--text-bright)" @click="login" text w-full>
          登录
        </ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/pinia';

const { loginDialog } = storeToRefs(useGlobalStore());
const loginForm = reactive({
  username: '',
  password: '',
  captcha: '',
});
const loginFormRef = ref();

function login() {
  if ('fan' === loginForm.username && 'fan223' === loginForm.password && '200103' === loginForm.captcha) {
    localStorage.setItem('fan', 'fan');
    loginDialog.value = false;
  } else {
    ElMessage.error('用户名或密码错误');
  }
}
</script>

<style scoped lang="scss">
.el-form .el-input {
  height: 2.5rem;
}
</style>
