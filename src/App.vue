<template>
  <router-view/>
</template>

<style lang="scss">
* {
  padding: 0px;
  margin: 0px;
}

html,body,#app,home {
  width: 100%;
  height: 100%;
  //overflow: hidden;
  //overflow-y: hidden;
}

//html,
//body {
//  height: 100%;
//}
//
// {
//  height: 100%;
//}

html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* 隐藏浏览器默认滚动条 */
  -ms-overflow-style: none; /* IE 和 Edge */
  scrollbar-width: none; /* Firefox */
}
/* For Webkit-based browsers like Chrome, Safari, and Opera */
*::-webkit-scrollbar {
  display: none; /* 隐藏滚动条 */
}

</style>
