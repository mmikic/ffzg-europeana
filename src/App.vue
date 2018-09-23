<template>
  <div id="app">

    <el-container class="ffzgea">
      <el-header class="ffzgea__header ffzgeaHeader">
        <el-row>
          <el-col :span="20" class="ffzgeaHeader__title">
            <h1>FFZG pokazni primjer konzumacije Europeana API-ja</h1>
          </el-col>
          <el-col :span="4" class="ffzgeaHeader__user">
            <el-button size="mini" type="info">
              <i class="el-icon-setting"></i>
              Unos autorizacijskog ključa
            </el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" class="ffzgea__aside">

          <section class="ffzgeaAside__about">
            <p>Ovaj projekt izrađen je za kolegij XXX pri filozofskom fakultetu Sveučilišta u Zagrebu. Informativne je prirode i kao takav nije namijenjen za širu uporabu.</p>
          </section>

          <el-menu default-active="1">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-search"></i>
                <span>Search</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">Izlist /GET/</el-menu-item>
                <el-menu-item index="1-2">Dohvat /GET/{id}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>Result</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">Izlist /GET/</el-menu-item>
                <el-menu-item index="1-2">Dohvat /GET/{id}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-picture-outline"></i>
                <span>Entity</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">Izlist /GET/</el-menu-item>
                <el-menu-item index="1-2">Dohvat /GET/{id}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span>Annotation</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">Izlist /GET/</el-menu-item>
                <el-menu-item index="1-2">Dohvat /GET/{id}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>

          <h2>Search API</h2>

          <el-menu default-active="1" class="ffzgeaMain__tabs" mode="horizontal">
            <el-menu-item index="2">Izvorni kôd</el-menu-item>
            <el-menu-item index="1">Pregled</el-menu-item>
          </el-menu>

        </el-main>
      </el-container>
    </el-container>

    <router-view/>
  </div>
</template>