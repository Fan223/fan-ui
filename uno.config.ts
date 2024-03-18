import { defineConfig, presetUno, presetIcons, presetAttributify, presetTypography, presetTagify } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetIcons(), presetAttributify(), presetTypography(), presetTagify()],
  safelist: [
    'i-ic-round-menu-book',
    'i-mdi-tools',
    'i-mdi-web',
    'i-mdi-about',
    'i-line-md-github',
    'i-ic-round-menu-book',
    'i-line-md-cog-filled-loop',
    'i-mdi-user-circle',
    'i-line-md-person-filled',
    'i-ic-round-grid-view',
    'i-ic-round-menu-book',
    'i-mdi-bookshelf',
    'i-mdi-category-plus',
    'i-mdi-tag-multiple',
  ],
});
