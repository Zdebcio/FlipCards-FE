<script lang="ts" setup>
import Button from '@/components/Button.vue'
import TextField from '@/components/TextField.vue'
</script>

<template>
  <div class="my-7">
    <TextField placeholder="email" />
    <TextField placeholder="password" />
  </div>
  <div class="d-flex justify-space-between">
    <!-- TODO: find best solution for redirection -->
    <Button @click="$router.push('/auth/register')" variant="text">No account? Register</Button>
    <Button width="120">Login</Button>
  </div>
</template>

<style lang="scss" scoped></style>
