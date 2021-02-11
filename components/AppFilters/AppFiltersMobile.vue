<template>
  <div class="container">
    <select v-model="options.type" class="container__select" name="type">
      <option v-for="(value, name) in filters.type" :key="name" :value="name">{{
        value
      }}</option>
    </select>

    <select v-model="options.date" class="container__select" name="date">
      <option v-for="(value, name) in filters.date" :key="name" :value="name">{{
        value
      }}</option>
    </select>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      options: { type: "video", date: "today", ...qs.parse(this.$route.query) },
      filters: {
        type: {
          video: "Video",
          channel: "Channel",
          playlist: "Playlist"
        },
        date: {
          today: "Today",
          thisWeek: "This week",
          thisMonth: "This month"
        }
      }

      // typesFilters: ["Video", "Channel", "Playlist"],
      // dateFilters: ["Today", "This week", "This month"]
    };
  },

  watch: {
    options: {
      handler() {
        this.$router.push(`/search?${qs.stringify(this.options)}`);
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  padding-left: 12px;
  .container__select {
    padding: 6px;
    border: 1px solid #ccc;
    background: #fbfbfb;
  }
}
</style>
