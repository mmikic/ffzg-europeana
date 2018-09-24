<template>
  <div id="app">

    <el-container class="ffzgea">
      <el-header class="ffzgea__header ffzgeaHeader">
        <el-row>
          <el-col :span="20" class="ffzgeaHeader__title">
            <h1>FFZG pokazni primjer konzumacije Europeana API-ja</h1>
          </el-col>
          <el-col :span="4" class="ffzgeaHeader__user hidden-sm-and-down">
            <el-button size="mini" type="info">
              <i class="el-icon-setting"></i>
              API ključ: hE5iMGt6Y
            </el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" class="ffzgea__aside hidden-sm-and-down">

          <section class="ffzgeaAside__about">
            <p>Aplikacija je izrađena pri filozofskom fakultetu Sveučilišta u Zagrebu. Informativne je prirode i kao takav nije namijenjen za širu uporabu.</p>
          </section>

          <!-- Inject navigation -->
          <navigation />

        </el-aside>
        <el-main>

          <!-- Inject router -->
          <router-view/>


        </el-main>
      </el-container>
    </el-container>

  </div>
</template>
<script>
import navigation from '@/components/Navigation'
export default {
    components: {
        navigation
    }
}
</script>