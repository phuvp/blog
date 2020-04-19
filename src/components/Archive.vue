<template>
  <div id="snowflakePage">
    <div v-for="(post, index) in posts" :key="index" class="postSummary">
      <div class="link" @click="selectedPost=post" v-html="post.title" />
      <div v-html="post.date" />
    </div>

    <div v-if="selectedPost" id="selectedPost" ref="selectedPost">
      <div id="postContentBox">
        <div id="postContent" v-html="selectedPost.fullText" />
      </div>
    </div>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import marked from 'marked';

const NUM_POSTS = 6;
export default
@Component()
class Snowflake {
  data() {
    return {
      posts: [],
      selectedPost: null,
      snowflakes: new Array(12),
    };
  }

  async created() {
    let posts = [];
    for(let i = NUM_POSTS; i > 0; i--) {
      posts.push(fetch(`/static/snowflake/${i}.md`));
    }
    posts = await Promise.all(posts);
    posts = posts.map(async (post) => post.text());
    posts = await Promise.all(posts);
    posts = posts.map((post) => {
      const tokens = marked.lexer(post);
      let title = tokens.find((x) => x.type === 'heading');
      let [date] = tokens.filter((x) => x.type === 'paragraph');

      [title, date] = [title, date].map((_raw) => {
        const raw = [_raw];
        raw.links = {};
        return marked.parser(raw);
      });

      const fullText = marked(post);
      return {
        title, date, fullText,
      };
    });

    this.posts = posts;
  }
}
</script>
<style lang="scss">
#snowflakePage {
  font-size: 26px;
  background-color: white;


  .postSummary {
    max-width: 960px;
    width: 80%;
    text-align: left;
    margin-left: 22.5%;

    h1 {
      font-size: 26px;
      color: #4020d6;
      font-weight: 200;
      margin-bottom: 0;
    }

    p {
      margin-top: 0;
    }

    .link {
      cursor:grab;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  #selectedPost {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    background: white;

    h1 {
      font-size: 46px;
      padding-bottom: 9px;
    }

    #postContent {
      width: 55%;
      margin: auto;
      text-align: left;
      font-size: 26px;
      line-height: 2;
    }
  }
}
</style>
