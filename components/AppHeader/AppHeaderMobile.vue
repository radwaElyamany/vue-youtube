<template>
  <div class="container">
    <font-awesome-icon
      class="container__youtube-icon"
      :icon="['fab', 'youtube']"
    />

    <p class="container__title" v-if="!isSearchActive">
      {{ searchQuery ? searchQuery : "Youtube" }}
    </p>
    <form
      @submit.prevent="handleOnClickSearch"
      method="GET"
      role="search"
      class="container__input"
    >
      <input
        v-model="searchQuery"
        class="container__input"
        type="search"
        v-if="isSearchActive"
      />
    </form>

    <font-awesome-icon
      class="container__search-icon"
      @click="handleOnClickSearchIcon"
      icon="search"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import qs from "qs";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  data() {
    return {
      isSearchActive: false,
      searchQuery: this.$route.query.query || undefined
    };
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
    handleOnClickSearchIcon() {
      this.isSearchActive = true;
    },
    handleOnClickSearch() {
      const options = {
        ...qs.parse(this.$route.query),
        q: this.searchQuery
      };

      this.$router.push(`/search?${qs.stringify(options)}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  background: #f8433f;
  padding: 10px 12px;
  .container__search-icon {
    cursor: pointer;
    color: #fff;
    margin-left: auto;
  }

  .container__youtube-icon {
    cursor: pointer;
    color: #fff;
    margin-right: 8px;
    width: 27px;
    height: 27px;
  }

  .container__title {
    color: #fff;
  }

  .container__input {
    width: 100%;
    margin-right: 8px;
    border-radius: 1px;
    padding: 3px;
    border: none;
  }
}
</style>
