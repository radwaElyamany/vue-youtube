<template>
  <div>
    <AppHeaderDesktop v-if="$mq === 'lg'" />
    <AppHeaderMobile v-else />
  </div>
</template>

<script>
import AppHeaderDesktop from "@/components/AppHeader/AppHeaderDesktop.vue";
import AppHeaderMobile from "@/components/AppHeader/AppHeaderMobile.vue";

export default {
  components: {
    AppHeaderDesktop,
    AppHeaderMobile
  }
};
</script>

<style lang="scss" scoped></style>
