<template>
    <small>
        <span v-if="categoryStore.users_reaction.self?.show">
            <span>
            <v-badge
                color="pink"
                :icon="showIcon(categoryStore.users_reaction.self?.type)"
                overlap
                class="py-2 mr-3 ml-1"
            >
                You<span v-if="categoryStore.users_reaction.count > 1">,</span>
            </v-badge>
            </span>            
        </span>
        <reaction/>
                            
        <span 
            v-for="(name, index) in categoryStore.users_reaction.users" 
            :key="index"
            v-if="index < 2" 
        >
            {{ name }},
        </span>
        <span v-if="categoryStore.users_reaction.count > 2">&
            <v-tooltip right >
                <template v-slot:activator="{ on, attrs }">
                    <a 
                        class="text-decoration-underline"
                        v-bind="attrs"
                        v-on="on"
                    >others</a>
                </template>
            <span>
                <small>
                    <div 
                        v-for="(name, index) in categoryStore.users_reaction.users" 
                        :key="'more_'+index"
                    >
                        {{ name }}
                    </div>
                </small>
            </span>
            </v-tooltip>            
        </span>
    </small>
</template>

<script>
  import { useCategoryStore } from '@/stores/category'

  export default {
    name: "reaction",

    data() {
        return {
            categoryStore: useCategoryStore()
        }
    },   
    
    components: {
        Reaction: () => import("@/components/post/Reaction"),
    },    
  }
</script>