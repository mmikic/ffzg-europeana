<template>

    <div>
        <h2>Search API &mdash; izlist</h2>
        <p>Europeana search API omogućuje osnovno pretraživanje zapisa pohranjenih u Europeana repozitoriju</p>

        <el-menu default-active="1" class="ffzgeaMain__tabs" mode="horizontal">
            <el-menu-item index="2">Izvorni kôd</el-menu-item>
            <el-menu-item index="1">Pregled</el-menu-item>
        </el-menu>

        <el-form ref="form" :model="form" class="ffzgeaSearch" label-position="top">

            <el-row>
                <el-col :span="24">
                    <el-form-item label="Krovni pojam pretrage">
                        <el-input v-model="form.query"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">

                </el-col>
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

                    <el-form-item label="Boja">
                        <el-color-picker
                                v-model="form.colourpalette"
                                :predefine="settings.colors">
                        </el-color-picker>
                    </el-form-item>

                    <el-form-item label="Tema">
                        <el-select v-model="form.theme">
                            <el-option v-for="theme in settings.themes" :label="theme" :value="theme"></el-option>
                        </el-select>
                    </el-form-item>

                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item>
                        <el-button type="primary" @click="getItems">Pretraži</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <pre class="ffzgeaMain__query" v-if="request && request.responseURL">{{ request.responseURL }}</pre>

        <el-switch
                v-model="settings.displayTable"
                active-text="Tablični prikaz"
                inactive-text="Galerijski prikaz">
        </el-switch>

        <template v-if="settings.displayTable && table">
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
                <el-table-column
                        prop="id"
                        label="Date"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="Name"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="link"
                        label="Address">
                </el-table-column>
            </el-table>
        </template>
        <template v-else-if="!settings.displayTable && table">

            <el-row>
                <el-col :span="6" v-for="(item, index) in table" :key="index">
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="item.image" class="ffzgeaResults__image">
                        <div style="padding: 14px;">
                            <span>{{ item.title }}</span>
                            <div class="bottom clearfix">
                                <time class="time">{{ item.id }}</time>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>

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
                displayTable: true
            }
        }
    },
    computed: {
        table() {
            if (!this.data) {
                return []
            }
            const results = []
            for(let item of this.data) {
                console.log(item)
                results.push({
                    id: item.id,
                    title: item.title[0],
                    link: item.link,
                    image: item.edmPreview[0]
                })
            }
            return results
        }
    },
    methods: {
        getItems() {
            const wskey = 'hE5iMGt6Y'
            axios.get('https://www.europeana.eu/api/v2/search.json', { params:
                {
                    wskey,
                    thumbnail: true,
                    ...this.form
                }
            }).then(({ request, data }) => {
                this.request = request
                this.data = data.items
            })
        },
    }
}
</script>