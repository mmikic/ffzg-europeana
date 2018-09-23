<template>
    <el-menu default-active="1">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-search"></i>
                <span>Search</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="1-1" @click.prevent="$router.push({ name: 'searchAll' })">
                    Izlist /GET/
                </el-menu-item>
                <el-menu-item index="1-2" @click="$router.push({ name: 'searchFind' })">
                    Dohvat /GET/{id}
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>Result</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="2-1" @click="$router.push({ name: 'resultAll' })">
                    Izlist /GET/
                </el-menu-item>
                <el-menu-item index="2-2" @click="$router.push({ name: 'resultFind' })">
                    Dohvat /GET/{id}
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-picture-outline"></i>
                <span>Entity</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="3-1" @click="$router.push({ name: 'entityAll' })">
                    Izlist /GET/
                </el-menu-item>
                <el-menu-item index="3-2" @click="$router.push({ name: 'entityFind' })">
                    Dohvat /GET/{id}
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-edit"></i>
                <span>Annotation</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="4-1" @click="$router.push({ name: 'annotationAll' })">
                    Izlist /GET/
                </el-menu-item>
                <el-menu-item index="4-2" @click="$router.push({ name: 'annotationFind' })">
                    Dohvat /GET/{id}
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>