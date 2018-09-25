<template>

    <div>
        <h2>Search API</h2>
        <p>Europeana Search API omogućuje osnovno pretraživanje zapisa pohranjenih u Europeana repozitoriju</p>

        <!-- tab switch -->
        <el-menu default-active="search" class="ffzgeaMain__tabs" mode="horizontal">
            <el-menu-item index="source" @click="settings.viewMode = 'source'">Izvorni kôd</el-menu-item>
            <el-menu-item index="search" @click="settings.viewMode = 'search'">Pretraga i prikaz</el-menu-item>
        </el-menu>

        <!-- search mode -->
        <template v-if="settings.viewMode === 'search'">

            <!-- search refine -->
            <el-form ref="form" :model="form" class="ffzgeaSearch" label-position="top">

                <el-collapse value="1">
                    <el-collapse-item title="Osnovna pretraga" name="1">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="Krovni pojam pretrage (npr. Paris)">
                                    <el-input v-model="form.query"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-collapse-item>

                    <el-collapse-item title="Dodatni parametri" name="2">
                        <el-row>
                            <el-col :span="8">

                                <el-form-item label="Korištenje">
                                    <el-select v-model="form.reusability">
                                        <el-option label="Dozvoljeno" value="open"></el-option>
                                        <el-option label="Uz dozvolu" value="permission"></el-option>
                                        <el-option label="Zabranjeno" value="restricted"></el-option>
                                    </el-select>
                                </el-form-item>

                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="Tema">
                                    <el-select v-model="form.theme" clearable>
                                        <el-option v-for="(theme, index) in settings.themes" :label="theme" :value="theme" :key="index"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="Boja">
                                    <el-color-picker
                                            v-model="form.colourpalette"
                                            :predefine="settings.colors">
                                    </el-color-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-collapse-item>

                </el-collapse>
                <el-form-item class="ffzgeaSearch__button">
                    <el-button type="primary" @click="getItems" :disabled="!form.query.length">Pretraži</el-button>
                </el-form-item>
            </el-form>

            <!-- results -->
            <template v-if="table.length" class="ffzgeaResults">

                <el-row>
                    <el-col :span="12" class="ffzgeaResults__headerCount">
                        <el-pagination
                                layout="prev, pager, next"
                                :total="results.total"
                                :page-size="results.rows"
                                :current-page="results.page"
                                @current-change="changePage"
                        >
                        </el-pagination>
                    </el-col>
                    <el-col :span="12" class="ffzgeaResults__headerToggle">
                        <el-switch
                                v-model="settings.displayTable"
                                active-text="Tablični prikaz"
                                inactive-text="Galerijski prikaz">
                        </el-switch>
                    </el-col>
                </el-row>

                <template v-if="settings.displayTable && table">
                    <el-table
                            :data="table"
                            v-loading="settings.loading"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="image"
                                label="Preview"
                                width="200">
                            <div slot-scope="{row}" class="ffzgeaResults__image">
                                <img :src="row.image" alt="Preview" :key="Math.random()"/>
                            </div>
                        </el-table-column>
                        <el-table-column prop="title" label="Name">
                            <div slot-scope="{row}">
                                <h2 class="ffzgeaResults__title">{{ row.title | truncate(100) }}</h2>
                                <el-tag size="mini" type="info" v-for="(tag, index) in row.labels" :key="index" style="margin-right: .4rem;">{{ tag }}</el-tag>
                            </div>
                        </el-table-column>
                    </el-table>
                </template>
                <template v-else-if="!settings.loading && !settings.displayTable && table">

                    <el-row :gutter="10" class="ffzgeaResults__gallery">
                        <el-col :span="6" v-for="(item, index) in table" :key="index" class="ffzgeaResults__galleryCol">
                            <el-card :body-style="{ padding: '0px' }">
                                <div class="ffzgeaResults__imageWrap">
                                    <img :src="item.image" class="ffzgeaResults__image">
                                </div>
                                <div style="padding: 14px;">
                                    <span>{{ item.title | truncate(100) }}</span>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>

                </template>

                <div class="ffzgeaResults__footer">
                    <el-pagination
                        layout="prev, pager, next"
                        :total="results.total"
                        :page-size="results.rows"
                        :current-page="results.page"
                        @current-change="changePage"
                    >
                    </el-pagination>
                </div>

            </template>

        </template>

        <!-- source mode -->
        <template v-if="settings.viewMode === 'source'">

            <el-alert
                title="Nema rezultata"
                type="info"
                center
                :closable="false"
                v-if="!request"
            >
                Kako bi istraživali pozadinske informacije konkretnog API odgovora, prvo pretražite nešto.
            </el-alert>

            <el-collapse value="2" v-else>
                <el-collapse-item title="Podaci korišteni u pretrazi" name="1">
                    <pre>{{ form }}</pre>
                </el-collapse-item>
                <el-collapse-item title="Generirani upit na Europeana API" name="2">
                    {{ request.responseURL }}
                </el-collapse-item>
                <el-collapse-item title="Sirovi odgovor Europeana API-ja" name="3">
                    <pre class="ffzgeaResults__raw">{{ data }}</pre>
                </el-collapse-item>
            </el-collapse>

            <section class="ffzgeaInfo">
                <h3>Programska logika</h3>
                <p>Za potrebe izrade aplikacije korišten je niz tehnologija čiji se popis nalazi na dnu ove stranice. Međutim, glavnu komunikacijsku logiku obavlja
                    JavaScript paket <a href="https://github.com/axios/axios" target="_blank">Axios</a> koji predstavlja HTTP klijenta za komunikaciju s API-jem.
                    Axios pruža niz mogućnosti pri komunikaciji, ali za potrebe pokaznog projekta korištena je samo <code>.get()</code> metoda i vezane funkcionalnosti.
                </p>

                <p>Upit na API, odnosno pravilno generirana putanja, može se vidjeti poviše, a sastoji se od dva segmenta. Prvi segment jest fiksna putanja do API-ja
                    uz dodatne parametre koji su potrebni. Konkretno to su API ključ <code>wskey</code> i oznaka kojom od API-ja očekujemo samo zapise koji imaju pripadajuću
                fotografiju <code>thumbnail</code>. Preostali segment API upita je varijabilan i ovisi o parametrima i stanju aplikacije.</p>

                <p>Preostali segment sastoji se od varijabilnih parametara, konkretno: upita <code>query</code>, prava na korištenje zapisa <code>reusability</code> i
                oznake boje <code>colourpalette</code>.</p>

                <p>Osim navedenih, prilikom komuniciranja API-ja proslijeđuju se dodatne dvije informacije: broj zapisa po stranici koje želimo dohvatiti <code>rows</code>
                    koji je definiran na 25, te početnog broja zapisa <code>start</code> čime možemo generirati navigaciju kroz brojne stranice API-ja.</p>

                <h3>Pojašnjenje segmenata kôda</h3>
                <p>Osnovni format Axios GET upita jest slijedeći:</p>
                <pre v-highlightjs><code class="javascript">
axios
.get('https://adresaapija.com/api/', parametri)
.then(odgovorApija => funkcija)
.catch(neuspjeliOdgovor => funkcija)
                </code></pre>

                <p>U slučaju uspješnog odgovora API-ja, izvršit će se kôd unutar <code>then</code> segmenta, dok u slučaju greške izvršit će se kôd unutar <code>catch</code>
                segmenta.</p>

                <p>U konkretnom pokaznom primjeru, kôd je slijedeći:</p>
                <pre v-highlightjs><code class="javascript">
// posjeti adresu API-ja i proslijedi parametre
axios.get('https://www.europeana.eu/api/v2/search.json', {
    params: {
        wskey,
        rows: this.results.rows,
        start: this.results.start,
        thumbnail: true,
        ...this.form
    }
}).then(({ request, data }) => {

    // obavijesti korisnika da je sve u redu
    this.$notify.success({ title: 'Search API', message: 'API uspješno odgovorio s podacima' })

    // pospremi rezultate s API-ja u odgovarajuce varijable
    this.request = request // podaci o poslanom zahtijevu
    this.data = data // vraceni podaci s API-ja
    this.results.total = data.totalResults // ukupan broj redaka

    // postavi stanje aplikacije na !ucitavanje
    this.settings.loading = false

}).catch(error => {

    // zapisi gresku u konzolu
    console.log(error)

    // obavijesti korisnika o gresci
    this.$notify.error({ title: 'Search API', message: 'Došlo je do greške prilikom dohvaćanja podataka' })

    // postavi stanje aplikacije na !ucitavanje
    this.settings.loading = false
})
                </code></pre>

                <h3>Preostale informacije o aplikaciji</h3>
                <p>Aplikacija je izrađena koristeći JavaScript programski jezik i <a href="https://vuejs.org/" target="_blank">Vue.js</a> framework. Dodatno, za
                    lakšu izradu aplikacijskog sučelja korišten je <a href="http://element.eleme.io/#/en-US" target="_blank">ElementUI</a>. Cijela aplikacija objavljena je
                    na <a href="http://firebase.google.com" target="_blank">Google Firebase</a> hostingu, a izvorni kôd aplikacije (bez osobnih podataka) dostupan je
                    na <a href="https://github.com/mmikic/ffzg-europeana" target="_blank">Github repozitoriju</a>.</p>

            </section>

        </template>

    </div>

</template>
<script>
import axios from 'axios'
import X11Colors from '@/helpers/X11Colors'
export default {
    data() {
        return {
            form: {
                query: '',
                reusability: 'open',
                colourpalette: null
            },
            request: null,
            data: null,
            settings: {
                colors: X11Colors.map(x => `#${x.hex}`),
                themes: ['manuscript', 'ww1', 'sport', 'nature', 'photography', 'music', 'migration', 'maps', 'art'],
                displayTable: true,
                viewMode: 'search',
                loading: false
            },
            results: {
                rows: 25,
                page: 1,
                start: 1,
                total: 0
            }
        }
    },
    computed: {
        table() {
            if (!this.data) {
                return []
            }
            const results = []
            for(let item of this.data.items) {
                console.log(item)
                results.push({
                    id: item.id,
                    title: item.title[0],
                    link: item.link,
                    image: item.edmPreview[0],
                    country: item.country,
                    labels: item.edmConceptLabel && item.edmConceptLabel.length && item.edmConceptLabel.map(x => x.def) || []
                })
            }
            return results
        }
    },
    methods: {
        changePage(page) {
            this.results.page = page
            this.results.start = page === 1 ? 1 : this.results.rows * (page - 1) + 1
            this.getItems()
        },
        getItems() {

            // set the application state to loading
            this.settings.loading = true

            // not a nice place to store an API key, but it works for demo purposes
            const wskey = 'hE5iMGt6Y'

            // notify the user a new request has been sent
            this.$notify.info({ title: 'Search API', message: 'Upit poslan na API' })

            // request the api with provided parameters
            axios.get('https://www.europeana.eu/api/v2/search.json', {
                params: {
                    wskey,
                    rows: this.results.rows,
                    start: this.results.start,
                    thumbnail: true,
                    ...this.form
                }
            }).then(({ request, data }) => {

                // notify the user it's all good
                this.$notify.success({ title: 'Search API', message: 'API uspješno odgovorio s podacima' })

                this.request = request
                this.data = data
                this.results.total = data.totalResults
                this.settings.loading = false

            }).catch(error => {

                // log the error for demo purposes
                console.log(error)

                // notify user
                this.$notify.error({ title: 'Search API', message: 'Došlo je do greške prilikom dohvaćanja podataka' })

                // reset the app state
                this.settings.loading = false

            })

        },
    }
}
</script>