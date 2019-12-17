<template>
    <div>
        <Table :columns="columns" :data="filterData"></Table>
        <div style="text-align:right; padding-top:10px;">
            <Page :total="data.length" :current="currentPage" @on-change="changePage"/>
        </div>
    </div>
</template>

<script>
import { getTableDemo2Data } from '@/api/data'

export default {
    data () {
        return {
            columns: [{
                title: 'id',
                key: 'id'
            }, {
                title: '名称111',
                key: 'name'
            }, {
                title: '描述',
                key: 'desc'
            }],
            data: [],
            filterData: [],
            currentPage: 1,
            pageSize: 10
        }
    },
    beforeCreate () {
        console.log('--beforeCreate--')
    },
    created () {
        getTableDemo2Data().then(res => {
            this.$data.data = res.data
        })
        console.log('--created--')
    },
    beforeMount () {
        console.log('--beforeMount--')
    },
    mounted () {
        console.log('--mounted--')
    },
    beforeUpdate () {
        console.log('--beforeUpdate--')
    },
    updated () {
        console.log('--updated--')
    },
    beforeDestroy () {
        console.log('--beforeDestroy--')
    },
    destroyed () {
        console.log('--destroyed--')
    },
    methods: {
        changePage (nextPage) {
            const pageSize = this.$data.pageSize
            this.$data.filterData =
                this.$data.data.slice(pageSize * (nextPage - 1), pageSize * nextPage)
        }
    },
    watch: {
        data () {
            this.$data.currentPage = 1
            this.$data.filterData = this.$data.data.slice(0, this.$data.pageSize)
        }
    }
}
</script>
