<template>
    <Layout style="height:100%;">
        <Content style="yy">
            <div style="width:100%;height:100%; padding-right:10px;">
                <Card style="width:100%;height:100%;">
                    <component v-bind:is="currentTabComponent"></component>
                </Card>
            </div>
        </Content>
        <Sider style="xx">
            <div style="width:100%;height:100%;background-color:#F5F7F9;">
                <Card style="width:100%;height:100%;">
                    <List>
                        <ListItem><p v-on:click="Switch(1)">报表1</p></ListItem>
                        <ListItem><p v-on:click="Switch(2)">报表2</p></ListItem>
                        <ListItem><p v-on:click="Switch(3)">报表3</p></ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                        <ListItem>报表1</ListItem>
                    </List>
                </Card>
            </div>
        </Sider>
    </Layout>
</template>

<script>
import Home from './Home.vue'
import Bar from './Bar.vue'
import Foo from './Foo.vue'

export default {
    data: function () {
        return {
            currentTabComponent: Home
        }
    },
    methods: {
        Switch: function (index) {
            switch (index) {
            case 1:
                this.currentTabComponent = Home
                break
            case 2:
                this.currentTabComponent = Foo
                break
            case 3:
                this.currentTabComponent = Bar
                break
            }
        }
    }
}
</script>

<style>

</style>
