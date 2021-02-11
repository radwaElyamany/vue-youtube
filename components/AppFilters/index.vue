<template>
  <div>
    <AppFiltersDesktop v-if="$mq === 'lg'" />
    <AppFiltersMobile v-else />
  </div>
</template>

<script>
import AppFiltersDesktop from "@/components/AppFilters/AppFiltersDesktop.vue";
import AppFiltersMobile from "@/components/AppFilters/AppFiltersMobile.vue";

export default {
  components: {
    AppFiltersDesktop,
    AppFiltersMobile
  }
};
</script>

<style lang="scss" scoped></style>
