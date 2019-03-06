<template>
  <div @click.stop="toggleContent" class="media">
    <span class="media__type">
      <span v-if="contentType == 'image'">
        <PhotoIcon /> {{ showContent ? "hide" : "show" }}
      </span>
      <span v-else-if="contentType == 'media'">
        <PlayIcon /> {{ showContent ? "hide" : "show" }}
      </span>
      <span v-else><LinkIcon /> visit</span>
    </span>
    <div v-show="showContent" class="media__embed">
      <div v-if="contentType == 'image'">
        <img :src="url" />
      </div>
      <div v-else-if="embed.content" v-html="content"></div>
      <div v-else>
        <video :src="videoURL" controls="controls" />
      </div>
    </div>
  </div>
</template>

<script>
import LinkIcon from "vue-ionicons/dist/md-link.vue";
import PhotoIcon from "vue-ionicons/dist/md-photos.vue";
import PlayIcon from "vue-ionicons/dist/md-play.vue";

export default {
  name: "Media",
  props: {
    embed: Object,
    hint: String,
    media: Object,
    url: String
  },
  components: {
    LinkIcon,
    PhotoIcon,
    PlayIcon
  },
  data: function() {
    return {
      content: "",
      showContent: false
    };
  },
  computed: {
    contentType: function() {
      if (this.hint == "image") {
        return "image";
      } else if (
        this.hint == "rich:video" ||
        this.hint == "hosted:video" ||
        this.url.endsWith(".gifv") ||
        (this.embed && this.embed.content) ||
        (this.media && this.media.reddit_video)
      ) {
        return "media";
      }

      return "link";
    },
    videoURL: function() {
      if (this.contentType == "media") {
        return this.media && this.media.reddit_video
          ? this.media.reddit_video.fallback_url
          : this.url.replace(".gifv", ".webm");
      }

      return "";
    }
  },
  methods: {
    toggleContent: function() {
      if (this.contentType != "link") {
        var content = !this.showContent ? this.embed.content : "";

        let e = document.createElement("textarea");
        e.innerHTML = content;

        this.content = e.value;
        this.showContent = !this.showContent;
      } else {
        window.open(this.url, "_blank");
      }
    }
  }
};
</script>

<style lang="scss">
.media {
  margin: 5px 0px;
  font-weight: 600;

  & img,
  video {
    max-height: 75vh;
  }

  &__embed {
    margin-top: 1em;
  }

  &__type {
    cursor: pointer;
    padding: 3px 5px;
    border-radius: 3px;
  }

  & .ion {
    position: relative;
    top: 2px;
  }
}
</style>
