<template>
  <!-- 标题栏 -->
  <div id="home">
    <div class="home-nav">
      <nav-bar>
        <h6 slot="center">购物街</h6>
      </nav-bar>
    </div>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true">  <!--  @pullingUp="loadMore" -->
      <!-- 轮播图组件 -->
      <home-swiper :banners="banners" />

      <recommend-view :recommends="recommends" />
      <feature-view />

      <tab-control :titles="titles" class="tab-control" @clickItem="clickItem"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/common/TabControl/TabControl"
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import GoodsList from "components/content/goods/GoodsList"
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
import { getHomeMultiData, getHomeGoods } from "network/home";
export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles:['流行', '新款', '精选'],
      goods:{
        'pop':{page: 0, list:[]},
        'new':{page: 0, list:[]},
        'sell':{page: 0, list:[]}
      },
      currentType:'pop',
      isShowBackTop: false
    };
  },
  created() {
    this.getHomeMultiData();

    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

    this.$bus.$on("itemImageLoad", () => {
      // console.log('-----------------');
      this.$refs.scroll.refresh();
    })
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list;
    }
  },
  methods:{
    backClick() {
        this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
    },
    // loadMore() {
    //     this.getHomeGoods(this.currentType)
    // },
    clickItem(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
    },
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        //console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // this.$refs.scroll.finishPullUp()
      })
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  padding-bottom: 49px;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  background-color: white;
  z-index: 9;
}

.content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
</style>
