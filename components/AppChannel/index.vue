<template>
  <div class="container" v-if="channel && channel.items && channel.items.length">
    <div class="container__banner" v-if="channel.items[0].brandingSettings.image">
      <img :src="channel.items[0].brandingSettings.image.bannerExternalUrl" alt />
    </div>
    <div class="container__details">
      <img :src="channel.items[0].snippet.thumbnails.medium.url" alt />
      <div>
        <p>{{ channel.items[0].snippet.title }}</p>
        <font-awesome-icon class="container__youtube-icon" :icon="['fab', 'youtube']" />
        <span>SUBSCRIBE</span>
        <span v-if="!channel.items[0].statistics.hiddenSubscriberCount">
          {{
          channel.items[0].statistics.subscriberCount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["channel"])
  }
};
</script>

<style lang="scss" scoped>
.container {
  // height: 200px;
  background: #f3f3f3;
  position: relative;
  height: 190px;
  margin-bottom: 20px;

  @media (min-width: 500px) {
    margin: 0 auto;
    max-width: 1130px;
    margin-bottom: 20px;
    height: 255px;
  }

  &__banner {
    height: 100px;
    width: 100%;

    @media (min-width: 500px) {
      height: 150px;
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &__details {
    position: absolute;
    top: 45px;

    @media (min-width: 500px) {
      top: 95px;
      left: 20px;
    }

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    svg {
      color: red;
    }

    span:first-of-type {
      color: red;
    }

    div {
      padding-left: 80px;
      margin-top: -8px;
    }
  }
}
</style>
