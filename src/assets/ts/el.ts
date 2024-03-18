import { FormInstance } from 'element-plus';

export function resetForm(form: FormInstance | undefined) {
  if (form) {
    form.resetFields();
  }
}
