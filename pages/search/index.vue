<template>
  <div>
    <!-- loading for desktop -->
    <div
      :class="$mq === 'lg' && $fetchState.pending ? 'animated yt-loader' : ''"
    ></div>

    <AppFilters />

    <!-- loading for mobile -->
    <div
      class="container__page-loading"
      v-if="$mq !== 'lg' && $fetchState.pending"
    >
      <font-awesome-icon icon="spinner" />
      <p>Loading</p>
    </div>

    <!-- app list -->
    <div v-else>
      <AppList :data="searchResult" />

      <div v-if="isLoadingShowMore" class="container__show-more-loading">
        <font-awesome-icon icon="spinner" />
      </div>

      <button
        @click="showMore"
        v-if="searchResult.nextPageToken"
        class="container__show-more"
      >
        <font-awesome-icon v-if="isLoadingShowMore" icon="spinner" />
        <span v-else>Show more items</span>
      </button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { mapState } from "vuex";

import AppHeader from "@/components/AppHeader";
import AppFilters from "@/components/AppFilters";
import AppList from "@/components/AppList";

export default {
  data() {
    return { isLoadingShowMore: false, bottom: false };
  },
  computed: {
    ...mapState(["searchResult"])
  },
  components: {
    AppHeader,
    AppFilters,
    AppList
  },
  methods: {
    showMore() {
      this.isLoadingShowMore = true;
      this.$store
        .dispatch("fetchMore", qs.parse(this.$route.query))
        .then(res => {
          this.isLoadingShowMore = false;
        })
        .catch(e => {
          this.isLoadingShowMore = false;
          console.log(e);
        });
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    }
  },
  watch: {
    $route() {
      this.$fetch();
    },
    bottom(newValue) {
      if (newValue && this.searchResult.nextPageToken) {
        this.showMore();
      }
    }
  },
  async fetch() {
    await this.$store.dispatch("fetchList", qs.parse(this.$route.query));
  },
  mounted() {
    if (process.browser && window.innerWidth > 900) {
      window.addEventListener("scroll", () => {
        this.bottom = this.bottomVisible();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  &__page-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    svg {
      width: 40px;
      height: 40px;
      margin-bottom: 20px;
    }
  }

  &__show-more-loading {
    display: none;
    @media (min-width: 900px) {
      margin: 30px 0;
      display: flex;
      justify-content: center;
      svg {
        width: 30px;
        height: 30px;
      }
    }
  }

  &__show-more {
    width: 100%;
    border: none;
    border-top: 1px solid #ccc;
    padding: 10px;
    background: white;
    @media (min-width: 900px) {
      display: none;
    }
  }
}
</style>
