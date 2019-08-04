<template>
  <!-- 标题栏 -->
  <div id="home">
    <div class="home-nav">
      <nav-bar>
        <h6 slot="center">购物街</h6>
      </nav-bar>
    </div>
    <!-- 轮播图组件 -->
    <home-swiper :banners="banners" />

    <recommend-view :recommends="recommends" />
    <feature-view />

    <tab-control :titles="titles" class="tab-control"/>

    <ul>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>111111</li>
      <li>111111</li>
      <li>t11111</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>111111</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>111111</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>111111</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>111111</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>111111</li>
      <li>tianchong</li>
      <li>tianchong</li>
      <li>111111</li>
    </ul>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/common/TabControl/TabControl"
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";


import { getHomeMultiData, getHomeGoods } from "network/home";
export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView
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
      }
    };
  },
  created() {
    this.getHomeMultiData();

    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods:{
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
}
</style>
