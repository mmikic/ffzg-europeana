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
                                <el-form-item label="Krovni pojam pretrage">
                                    <el-input v-model="form.query"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-collapse-item>

                    <el-collapse-item title="Sužavanje pretrage - u izradi" name="2">
                        <small>Opcija je trenutno u izradi</small>
                    </el-collapse-item>

                    <el-collapse-item title="Dodatni parametri" name="3">
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

                <template v-if="!settings.loading && settings.displayTable && table">
                    <el-table
                            :data="table"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="image"
                                label="Preview"
                                width="200">
                            <div slot-scope="{row}" class="ffzgeaResults__image">
                                <img :src="row.image" alt="Preview" />
                            </div>
                        </el-table-column>
                        <el-table-column prop="title" label="Name">
                            <div slot-scope="{row}">
                                <h2 class="ffzgeaResults__title">{{ row.title | truncate(100) }}</h2>
                                <el-tag size="mini" type="info" v-for="(tag, index) in row.labels" :key="index" style="margin-right: .4rem;">{{ tag }}</el-tag>
                            </div>
                        </el-table-column>
                        <el-table-column prop="link" label="Poveznica" width="100">
                            <div slot-scope="{row}">
                                <el-button size="small">Entitet</el-button>
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
                Kako bi istraživali pozadinsku logiku, prvo pretražite nešto.
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
                    labels: item.edmConceptLabel.map(x => x.def)
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
            this.settings.loading = true
            const wskey = 'hE5iMGt6Y'
            axios.get('https://www.europeana.eu/api/v2/search.json', { params:
                {
                    wskey,
                    rows: this.results.rows,
                    start: this.results.start,
                    thumbnail: true,
                    ...this.form
                }
            }).then(({ request, data }) => {
                this.request = request
                this.data = data
                this.results.total = data.totalResults
                this.settings.loading = false
            })
        },
    }
}
</script>