<template>
    <!-- Поиск -->
    <div class="clearfix">
        <div ref="inputGroup" class="input-group w-100 mb-3" style="z-index: 3004;">
            <dropdown animation="ani-none" :position="['left', 'top', 'right', 'top']" :visible="dropdown.filters" >
                <button @click="dropdown.filters = !dropdown.filters" type="button" class="btn btn-primary" style="border-top-right-radius: 0;border-bottom-right-radius: 0;" data-toggle="dropdown" aria-haspopup="false" aria-expanded="true">
                    <span class="fa fa-filter mr-1"></span>
                    <span class="d-none d-md-inline-block">фильтр</span>
                </button>
                <div slot="dropdown" class="dialog" style="z-index: 1000; min-width: 10rem;padding: .5rem 0;margin: .5rem 0 0;font-size: 1rem;color: #292b2c;text-align: left;list-style: none;background-color: #fff;-webkit-background-clip: padding-box;background-clip: padding-box;border: 1px solid rgba(0,0,0,.15);border-radius: .25rem;">
                    <div class="p-2" style="width: 200px;max-height: 600px;overflow-y: scroll;"  >
                        <div class="form-group">
                            <v-select :on-change="selectStatus" :value.sync="temp.status" :options="[{label:'Текущие', value: 0}, {label:'Архивные', value: 1}]" placeholder="Статус"></v-select>
                        </div>
                        <div class="form_group">
                            <button @click="clearListLoad()" :disabled="load" class="btn btn-primary btn-block" >Применить</button>
                            <button @click="resetFilter()" :disabled="load" class="btn btn-secondary btn-block btn-sm">Сбросить фильтр</button>
                        </div>
                    </div>
                </div>
            </dropdown>
            <input
                    type="text"
                    class="form-control w-100"
                    v-model="filterData.search_text"
                    placeholder="наименование, адрес"
                    style="z-index:0;"
                    @keyup.enter="clearListLoad()"
            >
            <div class="input-group-btn" v-if="filterData.search_text" style="z-index:1;">
                <button type="submit" class="btn btn-secondary" @click="resetText()"><span class="fa fa-times"></span></button>
            </div>
            <div class="input-group-btn"  style="z-index:1;">
                <button type="submit" class="btn btn-secondary" @click="clearListLoad()"><span class="fa fa-search mr-1"></span> поиск</button>
            </div>
        </div>
    </div>


</template>

<script>
    export default {

        props: ['load'],

        data() {

            return {

                dropdown: {
                    filters: false
                },
                filterData: {
                    search_text: '',
                    in_archive: '',
                },
                temp: {
                    status: ''
                },
                statuses: [{label:'Текущие', value: 0}, {label:'Архивные', value: 1}]
            }

        },

        mounted(){
            this.$nextTick(function () {
                this.setFiltered(this.$route.query);
            });
        },

        methods: {
            resetFilter(){
                this.clearListLoad();
            },

            resetText() {
                this.filterData.search_text = '';
                this.$nextTick(function() {
                    this.clearListLoad();
                });
            },
            clearListLoad(){


                this.$nextTick(function () {
                    this.$emit('filtered');
                });

            },
            setFiltered(query){

                for (let filterKey in this.filterData) {
                    for(let queryKey in query){
                        if(filterKey == queryKey) {
                            if(this.filterData[filterKey].constructor === Array) {
                                this.filterData[filterKey].push(query[queryKey]);
                            } else {
                                this.filterData[filterKey] = query[queryKey];
                            }

                        }
                    }
                }

                this.$nextTick(function () {
                    this.setSelect();
                });


            },
            setSelect()
            {
                if(this.filterData.in_archive)
                    this.temp.status = this.statuses[this.filterData.in_archive];
                this.$nextTick(function(){
                    this.clearListLoad();
                })

            },
            selected(key, options, ids)
            {
                let comp = this;
                ids.forEach(function (id) {
                    options.forEach(function(value) {
                        if(value.id == id) comp.temp[key].push(value);
                    });
                });
            },
            selectStatus(val) {
                if (val)
                    this.filterData.in_archive = val.value

                this.temp.status = val;
            }
        }

    }
</script>