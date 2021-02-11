import {
  startOfHour,
  startOfDay,
  startOfWeek,
  startOfMonth,
  formatRFC3339
} from "date-fns";

import qs from "qs";

import mockedData from "@/fixtures/data.js";

export const state = () => ({
  searchResult: {},
  video: {},
  relatedVideos: {},
  playlist: {},
  playlistVideos: {},
  channel: {},
  channelVideos: {}
});

export const mutations = {
  updateList: (state, payload) => {
    if (Object.keys(state.searchResult).length) {
      state.searchResult = {
        ...payload,
        items: [...payload.items, ...state.searchResult.items]
      };
    } else {
      state.searchResult = payload;
    }
  },

  updateVideo: (state, payload) => {
    state.video = payload;
  },
  updateRelatedVideos: (state, payload) => {
    state.relatedVideos = payload;
  },

  updatePlaylist: (state, payload) => {
    state.playlist = payload;
  },
  updatePlaylistVideos: (state, payload) => {
    state.playlistVideos = payload;
  },

  updateChannel: (state, payload) => {
    state.channel = payload;
  },
  updateChannelVideos: (state, payload) => {
    state.channelVideos = payload;
  }
};

export const actions = {
  async fetchList({ commit, state }, options) {
    const date = {
      lastHour: formatRFC3339(startOfHour(new Date())),
      today: formatRFC3339(startOfDay(new Date())),
      thisWeek: formatRFC3339(startOfWeek(new Date())),
      thisMonth: formatRFC3339(startOfMonth(new Date()))
    };

    const apiOptions = {
      key: "AIzaSyDO5selPpw21x9ofrewr3gure9d8L-OEkU",
      part: "snippet",
      ...options,
      ...(date[options.date] && { date: date[options.date] }),
      ...(state.searchResult.nextPageToken && {
        pageToken: state.searchResult.nextPageToken
      })
    };

    return await fetch(
      `https://youtube.googleapis.com/youtube/v3/search${qs.stringify(
        apiOptions,
        {
          addQueryPrefix: true
        }
      )}`
    )
      .then(res => {
        if (res.status === 403) {
          // handle youtube quota issue for testing
          return mockedData.searchResult;
        }
        return res.json();
      })
      .then(data => {
        commit("updateList", data);
      })
      .catch(e => {
        console.log("fetchList", e);
      });
  },

  async fetchMore({ dispatch, state }, options) {
    await dispatch("fetchList", options, true);
  },

  async fetchVideo({ commit, state }, options) {
    const apiOptions = {
      key: "AIzaSyDO5selPpw21x9ofrewr3gure9d8L-OEkU",
      part: ["snippet", "statistics", "player", "contentDetails"],
      id: options.id
    };

    return await fetch(
      `https://www.googleapis.com/youtube/v3/videos${qs.stringify(apiOptions, {
        addQueryPrefix: true,
        arrayFormat: "comma",
        encode: false
      })}`
    )
      .then(res => {
        if (res.status === 403) {
          // handle youtube quota issue for testing
          return mockedData.video;
        }
        return res.json();
      })
      .then(data => {
        commit("updateVideo", data);
      })
      .catch(e => {
        console.log("fetchVideo", e);
      });
  },

  async fetchRelatedVideos({ commit, state }, options) {
    const apiOptions = {
      key: "AIzaSyDO5selPpw21x9ofrewr3gure9d8L-OEkU",
      part: "snippet",
      ...options
    };

    return await fetch(
      `https://youtube.googleapis.com/youtube/v3/search${qs.stringify(
        apiOptions,
        {
          addQueryPrefix: true
        }
      )}`
    )
      .then(res => {
        if (res.status === 403) {
          // handle youtube quota issue for testing
          return mockedData.relatedVideos;
        }
        res.json();
      })
      .then(data => {
        commit("updateRelatedVideos", data);
      })
      .catch(e => {
        console.log("fetchRelatedVideos", e);
      });
  },

  async fetchPlaylist({ commit, state }, options) {
    const apiOptions = {
      key: "AIzaSyDO5selPpw21x9ofrewr3gure9d8L-OEkU",
      part: ["snippet", "player"],
      id: options.id
    };

    return await fetch(
      `https://www.googleapis.com/youtube/v3/playlists${qs.stringify(
        apiOptions,
        {
          addQueryPrefix: true,
          arrayFormat: "comma",
          encode: false
        }
      )}`
    )
      .then(res => {
        if (res.status === 403) {
          // handle youtube quota issue for testing
          return mockedData.playlist;
        }
        return res.json();
      })
      .then(data => {
        commit("updatePlaylist", data);
      })
      .catch(e => {
        console.log("fetchPlayList", e);
      });
  },

  async fetchPlaylistVideos({ commit, state }, options) {
    const apiOptions = {
      key: "AIzaSyDO5selPpw21x9ofrewr3gure9d8L-OEkU",
      part: "snippet",
      id: options.id
    };

    return await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems${qs.stringify(
        apiOptions,
        {
          addQueryPrefix: true
        }
      )}`
    )
      .then(res => {
        if (res.status === 403) {
          // handle youtube quota issue for testing
          return mockedData.playlistVideos;
        }
        res.json();
      })
      .then(data => {
        commit("updatePlaylistVideos", data);
      })
      .catch(e => {
        console.log("fetchPlaylistVideos", e);
      });
  },

  async fetchChannel({ commit, state }, options) {
    const apiOptions = {
      key: "AIzaSyDO5selPpw21x9ofrewr3gure9d8L-OEkU",
      part: ["snippet", "statistics", "brandingSettings"],
      ...options
    };

    return await fetch(
      `https://youtube.googleapis.com/youtube/v3/channels${qs.stringify(
        apiOptions,
        {
          addQueryPrefix: true,
          arrayFormat: "comma",
          encode: false
        }
      )}`
    )
      .then(res => {
        if (res.status === 403) {
          // handle youtube quota issue for testing
          return mockedData.channel;
        }
        return res.json();
      })
      .then(data => {
        commit("updateChannel", data);
      })
      .catch(e => {
        console.log("fetchChannel", e);
      });
  },

  async fetchChannelVideos({ commit, state }, options) {
    const apiOptions = {
      key: "AIzaSyDO5selPpw21x9ofrewr3gure9d8L-OEkU",
      part: "snippet",
      ...options
    };

    return await fetch(
      `https://youtube.googleapis.com/youtube/v3/search${qs.stringify(
        apiOptions,
        {
          addQueryPrefix: true
        }
      )}`
    )
      .then(res => {
        if (res.status === 403) {
          // handle youtube quota issue for testing
          return mockedData.channelVideos;
        }
        return res.json();
      })
      .then(data => {
        commit("updateChannelVideos", data);
      })
      .catch(e => {
        console.log("fetchChannelVideos", e);
      });
  }
};
