<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" :key="index" 
        class="tab-control-item"
        :class="{active:currureIndex == index}"
        @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currureIndex:0
        }
    },
    methods:{
        itemClick(index){
            this.currureIndex = index;
            this.$emit("clickItem", index);
        }
    }
}
</script>

<style scoped>
.tab-control {
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: white;
    font-size: 15px;
    text-align: center;
}
.tab-control-item {
    flex: 1;
}
.tab-control-item span {
    padding: 5px;
}
.active {
    color: var(--color-high-text)
}
.active span {
    border-bottom: 2px solid var(--color-high-text)
}
</style>
