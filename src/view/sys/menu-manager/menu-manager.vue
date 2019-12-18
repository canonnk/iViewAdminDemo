<template>
    <Row>
        <Col span="6">
            <treeselect v-model="value" :multiple="true" :options="options" />
        </Col>
        <Col span="18">
            <div style="width:100%; text-align:right;">
                <Button type="info">Info</Button>
                <Button type="success">Success</Button>
                <Button type="warning">Warning</Button>
                <Button type="error">Error</Button>
            </div>
        </Col>
    </Row>
</template>

<script>
import { sys_getMenuTree } from '@/api/sys/menu_manager'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
    component: {
        Treeselect
    },
    data () {
        return {
            value: null,
            options: [ {
                id: 'a',
                label: 'a',
                children: [ {
                    id: 'aa',
                    label: 'aa'
                }, {
                    id: 'ab',
                    label: 'ab'
                } ]
            }, {
                id: 'b',
                label: 'b'
            }, {
                id: 'c',
                label: 'c'
            } ]
        }
    },
    created () {
        sys_getMenuTree()
            .then(res => {
                // this.$data.menuTree = res.data
            })
    }
}

</script>
