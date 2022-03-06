<template>
  <div class="about">
    <h1>This is an about pag222e</h1>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      username: "username"
    })
  },
  mounted() {
    console.log('username', this.username, this.$store.state)
  }
  
};
</script>
