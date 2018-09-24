<template>
    <el-menu default-active="1">
        <el-menu-item index="1" @click="$router.push({ name: 'searchAll' })">
            <i class="el-icon-search"></i>
            Pretraga entiteta
        </el-menu-item>
    </el-menu>
</template>