<template>
    <div>
        <el-button type="info" @click="logout">退出</el-button>
    </div>
</template>

<script>
export default {
    name: 'AetherAppHome',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        logout(){
            // 清空token
            window.sessionStorage.clear();
            // 重定向到登录页
            this.$router.push('/login');
        }
    },
};
</script>

<style lang="less" scoped>

</style>