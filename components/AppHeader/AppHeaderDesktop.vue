<template>
  <header>
    <div>
      <div class="container">
        <div class="container__youtube-logo">
          <nuxt-link to="/">
            <img src="~assets/youtube-logo.webp" />
          </nuxt-link>
        </div>
        <form
          @click.prevent="handleOnClickSearch"
          method="GET"
          role="search"
          class="container__input"
        >
          <input v-model="searchQuery" class="container__input" type="search" />
          <button type="submit">
            <font-awesome-icon icon="search" />
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import qs from "qs";

export default {
  data() {
    return {
      searchQuery: this.$route.query.query || undefined
    };
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
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
header {
  min-height: 60px;

  & > div {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9999;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  }
}
.container {
  padding: 10px 0;

  display: flex;
  background: #fff;
  justify-content: space-between;
  max-width: 1130px;
  margin: 0 auto;

  .container__youtube-logo {
    width: 70px;
    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .container__input {
    display: flex;
    width: 90%;
    & input {
      height: 100%;
      align-self: center;
      border: 1px solid #ccc;
      padding: 0 5px;
      border-radius: 2px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    & button {
      height: 100%;
      width: 100px;
      background: #fbfbfb;
      border: 1px solid #ccc;
      border-left: none;
      cursor: pointer;
      border-radius: 2px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

      & svg {
        color: #909090;
      }
    }
  }
}
</style>
