<template>
  <div class="container">
    <div class="container__filters">
      <p>About 13,000,000 results</p>
      <div @click="handleShowFilters">
        <font-awesome-icon icon="filter" />FILTER
      </div>
    </div>
    <div v-if="showFilter" class="container__details">
      <ul>
        <li>UPLOAD DATE</li>
        <li
          v-for="(value, name) in filters.date"
          :key="name"
          :class="name === options.date ? 'selected' : ''"
          @click="handleOnClick('date', name)"
        >
          {{ value }}
          <font-awesome-icon
            @click.stop="handleOnClick('date', undefined)"
            v-if="name === options.date"
            icon="times"
          />
        </li>
      </ul>

      <ul>
        <li>TYPE</li>
        <li
          v-for="(value, name) in filters.type"
          :key="name"
          @click="handleOnClick('type', name)"
          :class="name === options.type ? 'selected' : ''"
        >
          {{ value }}
          <font-awesome-icon
            @click.stop="handleOnClick('type', undefined)"
            v-if="name === options.type"
            icon="times"
          />
        </li>
      </ul>

      <ul>
        <li>SORT BY</li>
        <li
          v-for="(value, name) in filters.order"
          :key="name"
          @click="handleOnClick('order', name)"
          :class="name === options.order ? 'selected' : ''"
        >
          {{ value }}
          <font-awesome-icon
            @click.stop="handleOnClick('order', undefined)"
            v-if="name === options.order"
            icon="times"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import qs from "qs";

export default {
  data() {
    return {
      showFilter: false,
      options: { ...qs.parse(this.$route.query) },

      filters: {
        date: {
          lastHour: "Last hour",
          today: "Today",
          thisWeek: "This week",
          thisMonth: "This month"
        },
        type: {
          video: "Video",
          channel: "Channel",
          playlist: "Playlist"
        },
        order: {
          relevance: "Relevance",
          date: "Upload date",
          viewCount: "View count",
          rating: "Rating"
        }
      }
    };
  },
  methods: {
    handleShowFilters() {
      this.showFilter = !this.showFilter;
    },
    handleOnClick(name, value) {
      this.options = {
        ...qs.parse(this.$route.query),
        [name]: value
      };
    }
  },
  watch: {
    options() {
      this.$router.push(`/search?${qs.stringify(this.options)}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1130px;
  margin: 40px auto 30px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
}

.container__filters {
  display: flex;
  justify-content: space-between;
  div {
    cursor: pointer;
    color: #6e6e6e;
  }

  p {
  }
}

.container__details {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  max-width: 1000px;

  ul {
    list-style-type: none;
    padding: 0;
    width: 30%;

    li {
      cursor: pointer;
    }

    li:first-child {
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 20px;
    }

    li:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}

.selected {
  font-weight: bold;
}
</style>
