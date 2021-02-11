<template>
  <div class="container" v-if="source && source.items && source.items.length">
    <div
      class="container__video"
      v-html="source.items[0].player.embedHtml"
    ></div>

    <div v-if="!$route.query.isPlaylist">
      <div class="container__details">
        <p class="container__video__details__title">
          {{ source.items[0].snippet.title }}
        </p>
        <p>
          {{
            source.items[0].statistics
              ? source.items[0].statistics.viewCount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : ""
          }}
          Views
        </p>
      </div>

      <div class="container__actions">
        <div>
          <span>
            <font-awesome-icon icon="thumbs-up" />
            {{ source.items[0].statistics.likeCount }}
          </span>

          <span>
            <font-awesome-icon icon="thumbs-down" />
            {{ source.items[0].statistics.dislikeCount }}
          </span>
        </div>
        <div>
          <span>
            <font-awesome-icon icon="plus" />
          </span>

          <span>
            <font-awesome-icon icon="share" />
          </span>

          <span>
            <font-awesome-icon icon="flag" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { mapState } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: {
    FontAwesomeIcon
  },
  computed: {
    ...mapState(["video", "playlist"]),
    source() {
      return this.$route.query.isPlaylist ? this.playlist : this.video;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 12px;
  margin-bottom: 20px;
  @media (min-width: 500px) {
    padding: 0;
  }

  &__video {
    margin-bottom: 20px;
    width: 100%;
  }

  @media (min-width: 500px) {
    & > :nth-child(2) {
      display: flex;
      justify-content: space-between;
      height: 50px;
    }
  }

  &__details {
    margin-bottom: 10px;

    @media (min-width: 500px) {
      margin-bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    p {
      display: inline;
      @media (min-width: 500px) {
        display: block;
      }
    }

    p:first-child {
      margin-right: 10px;
    }

    p:last-child {
      color: #676767;
    }
  }

  &__actions {
    display: flex;
    justify-content: space-between;

    @media (min-width: 500px) {
      align-self: flex-end;
    }

    span {
      color: #676767;
      cursor: pointer;
    }

    span {
      margin-right: 8px;
    }

    @media (min-width: 500px) {
      span {
        margin-right: 25px;
      }
    }
  }
}
</style>
