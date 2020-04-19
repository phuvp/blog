<template>
  <div id="opener">
    <div v-for="(post, index) in posts" :key="index" class="postSummary">
      <div v-html="post.fullText" />
    </div>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import marked from 'marked';

const NUM_POSTS = 3;
const FIRST_POST = 2;
export default
@Component()
class Opener {
  data() {
    return {
      posts: [],
    };
  }

  mounted() {

  }

  async created() {
    let posts = [];
    for(let i = FIRST_POST + NUM_POSTS; i > FIRST_POST; i--) {
      posts.push(fetch(`/static/posts/${i}.md`));
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
  #opener {
    max-width: 960px;
    width: 55%;
    margin: auto;
    text-align: left;
    font-size: 26px;
    line-height: 2;

    h1 {
      font-size: 46px;
      padding-bottom: 9px;
    }

    p {
      padding: 2px 0;
    }

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
