<template>
  <div>
    <AppChannel />
    <AppList :data="channelVideos" />
  </div>
</template>

<script>
import { mapState } from "vuex";

import AppChannel from "@/components/AppChannel";
import AppList from "@/components/AppList";

export default {
  computed: {
    ...mapState(["channelVideos"])
  },
  components: {
    AppChannel,
    AppList
  },
  async fetch() {
    await Promise.all([
      this.$store.dispatch("fetchChannel", {
        id: this.$route.params.id
      }),
      this.$store.dispatch("fetchChannelVideos", {
        channelId: this.$route.params.id,
        type: "video"
      })
    ]);
  }
};
</script>

<style lang="scss" scoped></style>
