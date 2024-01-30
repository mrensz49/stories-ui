<template>
    <v-col cols="12" lg="4" md="6" >

        <v-hover
            v-slot:default="{ hover }"
            close-delay="50"
            open-delay="50"
        >
            <div >
            <v-card
                :color="hover ? 'white' : 'transparent'"
                :elevation="hover ? 12 : 0"
                flat
                hover
                :to="'/category/'+content.category.slug+'?q='+content.title_slug"
            >
                <v-img
                    :aspect-ratio="16 / 9"
                    class="elevation-2"
                    gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                    height="200px"
                    :src="getPublicImageThumbnail(content.image)"
                    style="border-radius: 16px"
                >
                <v-card-text>
                    <v-btn small color="accent" :to="'/category/'+content.category.slug">
                        <small>{{ content.category.category }}</small>
                    </v-btn>
                </v-card-text>
                </v-img>

                <v-card-text>
                <div class="text-h7 font-weight-bold primary--text" v-html="content.title"></div>
                <!-- <div class="text-h6 font-weight-regular pt-3 text--secondary"></div> -->
                <!-- <div class="text-body-1 py-4"  v-html="content.data.substring(0,100)+'...'"></div> -->

                <div class="d-flex align-center">
                    More ...
                    <!-- <v-avatar color="accent" size="36">
                    <v-icon dark>mdi-feather</v-icon>
                    </v-avatar> -->

                    <!-- <div class="pl-2">Yan Lee · 22 July 2019</div> -->
                </div>
                </v-card-text>
            </v-card>
            </div>
        </v-hover>
    </v-col>
</template>

<script>

    export default {

        name: "Card-recommended",

        props: ['content'],

    }
</script>