<template>
  <div>
    <AppVideo />
    <AppList :data="source" />
  </div>
</template>

<script>
import { mapState } from "vuex";

import AppHeader from "@/components/AppHeader";
import AppVideo from "@/components/AppVideo";
import AppList from "@/components/AppList";

export default {
  computed: {
    ...mapState(["relatedVideos", "playlistVideos"]),
    source() {
      return this.$route.query.isPlaylist
        ? this.playlistVideos
        : this.relatedVideos;
    }
  },
  components: {
    AppHeader,
    AppVideo,
    AppList
  },
  async fetch() {
    if (this.$route.query.isPlaylist) {
      // fetch data for playlist
      await Promise.all([
        this.$store.dispatch("fetchPlaylist", { id: this.$route.params.id }),

        this.$store.dispatch("fetchPlaylistVideos", {
          id: this.$route.params.id
        })
      ]);
    } else {
      // fetch data for video
      await Promise.all([
        this.$store.dispatch("fetchVideo", { id: this.$route.params.id }),
        this.$store.dispatch("fetchRelatedVideos", {
          relatedToVideoId: this.$route.params.id,
          type: "video"
        })
      ]);
    }
  }
};
</script>

<style lang="scss" scoped></style>
