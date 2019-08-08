<template>
    <div>
        <nav-bar>
            <div slot="left" class="left" @click="leftClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="center">
                <div v-for="(item, index) in titles" :key="index" 
                class="center-item" :class="{active: index === currentIndex}"
                @click="itemClick(index)">
                    {{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name:'DetailNavBar',
    components:{
        NavBar
    },
    data() {
        return {
            titles:['商品', '参数 ', '评论', '推荐'],
            currentIndex:0
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index;
        },
        leftClick() {
            this.$router.back();
        }
    }
}
</script>

<style scoped>
.center {
    display: flex;
}
.center-item {
    flex: 1;
}
.active {
    color: var(--color-high-text)
}
.left img {
    margin-top: 10px;
}
</style>


