<template>
  <div>
    <v-card absolute app color="primary" dark flat>
      <v-container>
        <v-row align="start">
          <v-col cols="12" md="7">
            <h4 class="text-h5 font-weight-bold">Stories</h4>
            <p class="text-body-1">
              <small>
                When you read an online story, you're not just reading it on
                your own. You're joining a community of readers and authors who
                are passionate about stories. You can share your thoughts on the
                story with other readers, and you can even leave comments for
                the story.
              </small>
            </p>
          </v-col>
          <v-col cols="12" md="3">
            <h4 class="text-h5 font-weight-bold">Contact</h4>
            <v-subheader class="text-h7"
              >mrensz49@storiesforyou.net / mrensz49@gmail.com</v-subheader
            >
          </v-col>
          <v-col cols="12" md="2">
            <h4 class="text-h5 font-weight-bold">Credits</h4>
            <a @click="showCredits()" class="text-decoration-none"
              ><v-subheader class="text-h7 mt-n3 pointer">show</v-subheader></a
            >
          </v-col>

          <!-- <v-col cols="12" md="3">
            <v-list color="transparent" flat>
              <v-subheader class="text-h6">HeroUI</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item
                    v-for="(item, i) in heroui"
                    :key="i"
                    :href="item.href"
                    dense
                    target="_black"
                >
                  <v-list-item-content>
                    <v-list-item-title
                        class="text-body-1"
                        v-text="item.text"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col> -->

          <!-- <v-col cols="12" md="3">
            <v-list color="transparent" flat>
              <v-subheader class="text-h6">Giraffe</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item
                    v-for="(item, i) in shock"
                    :key="i"
                    :href="item.href"
                    dense
                    target="_black"
                >
                  <v-list-item-content>
                    <v-list-item-title
                        class="text-body-1"
                        v-text="item.text"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col> -->

          <!-- <v-col cols="12" md="3">
            <div>
              <h5 class="text-h6 font-weight-bold">
                Subscribe
              </h5>
              <p class="text-body-1">
                The latest Rocket news, articles, and resources, sent straight
                to your inbox every month.
              </p>
            </div>

            <v-row>
              <v-col cols="8">
                <v-text-field
                    hide-details
                    label="Filled"
                    light
                    solo
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-btn block color="secondary" large>
                  Subscribe
                </v-btn>
              </v-col>
            </v-row>
          </v-col> -->
        </v-row>

        <div class="text-center mt-6">
          Copyright &copy;
          <a class="white--text" target="_blank">RS</a>
          {{ new Date().getFullYear() }}. All rights reserved.
          <small>v0.3.9</small>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({}),

  methods: {
    showCredits() {
      this.$router.push(`/credits`).catch((err) => {});
    },
  },
};
</script>
