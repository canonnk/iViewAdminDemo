<template>
    <Row>
        <Col span="6">
            <Tree :data="treeData"></Tree>
        </Col>
        <Col span="18">
            <div style="width:100%; text-align:right;">
                <Button type="info">Info</Button>
                <Button type="success">Success</Button>
                <Button type="warning">Warning</Button>
                <Button type="error">Error</Button>
            </div>
            <treeselect v-model="value" :multiple="false" :options="treeselectData" />
        </Col>
    </Row>
</template>

<script>
import { sys_getMenuTree } from '@/api/sys/menu_manager'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
// 格式化数据给左侧的树使用（tree）
const generateTreeData =
    (nodes, parent) => {
        if (nodes === undefined || nodes == null || nodes.length <= 0) {
            return []
        }
        const result = []
        for (let i = 0; i < nodes.length; ++i) {
            if (nodes[i].parent === parent) {
                result.push({
                    title: nodes[i].text,
                    id: nodes[i].id,
                    children: generateTreeData(nodes, nodes[i].id)
                })
            }
        }
        if (result.length <= 0) {
            return null
        }
        return result
    }
// 格式化数据给下拉选择的树控件使用（treeselect）
const generateTreeselectData =
    (nodes, parent) => {
        if (nodes === undefined || nodes == null || nodes.length <= 0) {
            return []
        }
        const result = []
        for (let i = 0; i < nodes.length; ++i) {
            if (nodes[i].parent === parent) {
                const children =
                    generateTreeselectData(nodes, nodes[i].id)
                result.push({
                    label: nodes[i].text,
                    id: nodes[i].id,
                    children: children == null ? undefined : children
                })
            }
        }
        if (result.length <= 0) {
            return null
        }
        return result
    }

export default {
    components: {
        Treeselect
    },
    data () {
        return {
            menuTreeData: [],
            value: null
        }
    },
    computed: {
        treeselectData () {
            const data =
                generateTreeselectData(this.$data.menuTreeData, null)
            return data
        },
        treeData () {
            const data =
                generateTreeData(this.$data.menuTreeData, null)
            return data
        }
    },
    created () {
        sys_getMenuTree()
            .then(res => {
                this.$data.menuTreeData = res.data
            })
    }
}

</script>
