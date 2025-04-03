import { defineConfig, presetWind4, presetIcons, presetAttributify, presetTypography, presetTagify } from 'unocss';

export default defineConfig({
  presets: [presetWind4(), presetIcons(), presetAttributify(), presetTypography(), presetTagify()],
  safelist: [
    'i-mdi-navigation-variant-outline',
    'i-ic-round-menu-book',
    'i-mdi-tools',
    'i-line-md-pencil',
    'i-mdi-web',
    'i-mdi-about',
    'i-line-md-github',
    'i-line-md-cog-filled-loop',
    'i-mdi-user-circle',
    'i-line-md-person-filled',
    'i-ic-round-grid-view',
    'i-mdi-bookshelf',
    'i-mdi-category-plus',
    'i-mdi-tag-multiple',
  ],
});
