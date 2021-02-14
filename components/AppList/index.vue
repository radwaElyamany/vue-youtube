<template>
  <div class="container">
    <div class="container__list" v-if="data">
      <div v-for="video in data.items" :key="video.etag">
        <!-- video -->

        <nuxt-link
          class="container__list__video"
          v-if="
            video.snippet &&
              (video.id.kind === 'youtube#video' ||
                (video.snippet &&
                  video.snippet.resourceId &&
                  video.snippet.resourceId.kind === 'youtube#video'))
          "
          :to="
            video.id.kind === 'youtube#video'
              ? `/video/${video.id.videoId}`
              : `/video/${video.snippet.resourceId.videoId}`
          "
        >
          <div class="container__list__video__thumbnail">
            <img :src="video.snippet.thumbnails.medium.url" />
          </div>

          <div class="container__list__video__details">
            <p class="container__list__video__title">{{ video.snippet.title }}</p>
            <p class="container__list__video__channel-title">{{ video.snippet.channelTitle }}</p>
          </div>
        </nuxt-link>

        <!-- playlist -->
        <nuxt-link
          class="container__list__playlist"
          v-else-if="video.id.kind === 'youtube#playlist'"
          :to="`/video/${video.id.playlistId}?isPlaylist=true`"
        >
          <div class="container__list__playlist__thumbnail">
            <img :src="video.snippet.thumbnails.medium.url" />
            <div class="container__list__playlist__overlay">
              <p>37</p>
              <font-awesome-icon class="container__list__search-icon" icon="bars" />
            </div>
          </div>
          <div class="container__list__playlist__details">
            <p class="container__list__playlist__title">{{ video.snippet.title }}</p>
            <p class="container__list__playlist__channel-title">{{ video.snippet.channelTitle }}</p>
          </div>
        </nuxt-link>

        <!-- channel -->

        <nuxt-link
          class="container__list__channel"
          v-else-if="video.id.kind === 'youtube#channel'"
          :to="`/channel/${video.id.channelId}`"
        >
          <div class="container__list__channel_thumbnail">
            <img :src="video.snippet.thumbnails.medium.url" />
          </div>
          <div class="container__list__channel__details">
            <p class="container__list__channel__title">{{ video.snippet.title }}</p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

import { mapState } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  props: {
    data: { type: Object }
  },
  components: {
    FontAwesomeIcon
  }
};
</script>

<style lang="scss" scoped>
.container {
  a {
    text-decoration: none;
  }

  @media (min-width: 500px) {
    margin: 0 auto;
    max-width: 1130px;
  }

  &__list {
    padding: 0 12px;

    @media (min-width: 500px) {
      padding: 0;
    }

    &__video,
    &__playlist,
    &__channel {
      display: flex;
      margin-bottom: 16px;
    }

    &__video__thumbnail,
    &__playlist__thumbnail,
    &__channel_thumbnail {
      margin-right: 16px;
      width: 160px;
      height: 90px;
      @media (min-width: 500px) {
        width: 360px;
        height: 200px;
      }

      & img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    &__channel_thumbnail {
      display: flex;
      justify-content: center;
      align-items: center;
      & img {
        width: 97px;
        height: 97px;
        @media (min-width: 500px) {
          width: 150px;
          height: 150px;
        }
      }
    }

    &__video__details,
    &__playlist__details,
    &__channel__details {
      flex: 1;
    }

    &__video__title,
    &__playlist__title {
      color: #030303;
      margin-bottom: 2px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-break: break-all;
      font-size: 18px;
    }

    &__video__channel-title,
    &__playlist__channel-title {
      color: #606060;
      margin-bottom: 2px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-break: break-all;
      font-size: 16px;
    }

    &__playlist > :first-child {
      position: relative;
      & div {
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        height: 100%;
        width: 40%;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        p,
        svg {
          color: white;
        }
      }
    }

    &__channel {
      align-items: center;
      img {
        border-radius: 50%;
      }
    }
  }
}
</style>
