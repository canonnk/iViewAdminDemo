<template>
    <Layout style="height:100%;">
        <Content style="yy">
            <div style="width:100%;height:100%; padding-right:10px;">
                <Card style="width:100%;height:100%;">
                    <component v-bind:is="currentTabComponent"></component>
                </Card>
            </div>
        </Content>
        <Sider v-bind:collapsible="true" v-model="isHideReportList" hide-trigger v-bind:width="200" v-bind:collapsed-width="80">
            <div style="width:100%;height:100%;background-color:#F5F7F9;">
                <Card style="width:100%;height:100%;overflow-y: auto;" >
                    <List style="padding:0;">
                        <ListItem style="padding:0;">
                            <Button type="primary" style="width:100%; padding-left:0;padding-right:0;" v-on:click="isHideReportList = !isHideReportList">
                                <Icon type="md-arrow-round-back" v-if="isHideReportList" style="font-size:22px;"/>
                                <Icon type="md-arrow-round-forward" v-else style="font-size:22px;"/>
                            </Button>
                        </ListItem>
                        <ListItem style="padding:0;" v-for="item in Reports" v-bind:key="item.id">
                            <Button
                                v-bind:type="currentComponentName==item.id?'primary':'text'"
                                v-on:click="Switch(item.id)"
                                v-bind:style="'width:100%; color:black;padding-left:0;padding-right:0;' + (isHideReportList?'':'text-align:left;')"
                                ghost>
                                <Icon v-bind:type="item.icon" style="font-size:22px;" /><span style="padding-left:10px;" v-if="!isHideReportList">{{item.name}}</span>
                            </Button>
                        </ListItem>
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
            currentComponentName: '',
            currentTabComponent: '',
            isHideReportList: false,
            Reports: [
                { id: 'Home', component: Home, name: '报表1', icon: 'ios-appstore' },
                { id: 'Foo', component: Foo, name: '报表2', icon: 'md-archive' },
                { id: 'Bar', component: Bar, name: '报表3', icon: 'md-barcode' }
            ]
        }
    },
    methods: {
        Switch: function (componentName) {
            this.currentComponentName = componentName
            for (let i = 0; i < this.Reports.length; i++) {
                if (this.Reports[i].id === componentName) {
                    this.currentTabComponent = this.Reports[i].component
                    break
                }
            }
        }
    }
}
</script>

<style>
.x{
 overflow-y: scroll;
}
</style>
