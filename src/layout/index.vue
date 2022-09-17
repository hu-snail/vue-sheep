<template>
    <el-container class="container">
      <el-header class="header">
        <h1>羊了个🐑 通关</h1>
      </el-header>
      <el-main class="main">
        <slot />
      </el-main>
    </el-container>
</template>

<style lang="scss" scoped>
.container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
    .header {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        .left {
            display: flex;
            align-items: center;
            .moon {
                margin-right: 5px;
                cursor: pointer;
            }
        }
    }
    .main {
        display: flex;
        justify-content: center;
    }
}
</style>