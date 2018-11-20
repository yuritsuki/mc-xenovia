<template>
    <!-- Поиск -->
    <div class="col-2 offset-2 fixed-top h-100 pt-4">
        <div class="form-group">
            <input v-model="filterData.search_text" type="text" class="form-control form-control-sm" placeholder="Имя, телефон или эл.почта">
        </div>

        <div class="form_group">
            <button @click="clearListLoad()" :disabled="load" class="btn btn-primary btn-block" >Применить</button>
            <button @click="resetFilter()" :disabled="load" class="btn btn-secondary btn-block btn-sm">Сбросить фильтр</button>
        </div>
    </div>
</template>

<script>
    export default {

        props: ['load'],

        data() {

            return {

                filterData: {
                    search_text: '',
                },
                temp: {
                },
            }

        },

        mounted(){
            this.$nextTick(function () {
                this.setFiltered(this.$route.query);
            });
        },

        methods: {
            resetFilter(){
                this.filterData.search_text = '';


                this.clearListLoad();
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
        }

    }
</script>