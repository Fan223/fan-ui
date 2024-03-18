import { defineConfig, presetUno, presetIcons, presetAttributify, presetTypography, presetTagify } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetIcons(), presetAttributify(), presetTypography(), presetTagify()],
});
