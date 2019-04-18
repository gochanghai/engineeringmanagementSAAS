<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.el-dialog__header{
	background-color: #56A5F4 !important;
	padding: 13px;
}
.el-dialog__title{
	font-size: 16.3px;
	color: #fff;
}

.el-dialog__headerbtn .el-dialog__close{
	color: #fff;
}

.dialog-footer{
	display: block;
	text-align: center;
	/*border: 1px solid;*/
}
</style>
