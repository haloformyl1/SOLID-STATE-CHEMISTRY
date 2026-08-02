import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['src_backup/**', 'node_modules/**', 'dist/**'],
  },
});
