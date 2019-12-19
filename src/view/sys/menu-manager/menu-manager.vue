<template>
    <div>
        <Row>
            <Col span="6">
                <Tree :data="treeData"></Tree>
            </Col>
            <Col span="18">
                <Tabs value="menuInformation">
                    <TabPane label="菜单信息" name="menuInformation">
                        <Card style="padding:30px;">
                            <div style="width:100%; text-align:right; margin-bottom:20px;">
                                <Button type="success" style="margin:2px;">添加</Button>
                                <Button type="success" style="margin:3px;">修改</Button>
                                <Button type="error" style="margin:2px;">删除</Button>
                            </div>
                            <Form :model="formValue" label-position="right" :label-width="100">
                                <FormItem label="菜单代码">
                                    <Input v-model="formValue.menuCode"></Input>
                                </FormItem>
                                <FormItem label="菜单名称">
                                    <Input v-model="formValue.menuName"></Input>
                                </FormItem>
                                <FormItem label="图标">
                                    <Select v-model="formValue.icon" :prefix="formValue.icon">
                                        <Option v-for="item in icons" :value="item.id" :key="item.id">{{ item.text }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="标题">
                                    <Input v-model="formValue.title"></Input>
                                </FormItem>
                                <FormItem label="页面模板">
                                    <RadioGroup v-model="formValue.layoutModule">
                                        <Radio label="Main" border>主框架</Radio>
                                        <Radio :label="null" border>不使用</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem label="是否显示">
                                    <RadioGroup v-model="formValue.display">
                                        <Radio label="true" border>显示</Radio>
                                        <Radio label="false" border>隐藏</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem label="上级表单">
                                    <treeselect v-model="formValue.parentMenuCode" :multiple="false" :options="treeselectData" />
                                </FormItem>
                                <FormItem label="地址">
                                    <Input v-model="formValue.path"></Input>
                                </FormItem>
                            </Form>
                        </Card>
                    </TabPane>
                    <TabPane label="菜单权限" name="menuPermission">
                        <Table border :columns="columns12" :data="data6">
                            <template slot-scope="{ row, index }" slot="action">
                                <Button type="primary" size="small" style="margin-right: 5px" @click="showHasMenuPermissionRoles(row)">角色反查</Button>
                                <Button type="error" size="small" @click="removeMenuPermission(row)">删除权限</Button>
                            </template>
                        </Table>
                    </TabPane>
                    <TabPane label="多语言" name="multiLanguage">
                        <Table border :columns="multiLanguageColumns" :data="multiLanguageDatas">
                            <template slot-scope="{ row, index }" slot="action">
                                <Button type="primary" size="small" style="margin-right: 5px" @click="editMenuMultiLanguage(row)">修改</Button>
                            </template>
                        </Table>
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
        <Modal
            v-model="isShowRoleModel"
            title="权限反查">
            <p>系统管理员</p>
            <p>超级管理员</p>
            <p>普通用户</p>
        </Modal>
        <Modal v-model="isShowDeletePermissionModel" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>是否删除权限？</span>
            </p>
            <div style="text-align:center">
                <p>删除后，讲同步删除所有角色的权限</p>
                <p>是否确认删除?</p>
            </div>
            <div slot="footer">
                <Button @click="isShowDeletePermissionModel = false">取消</Button>
                <Button type="error" @click="deletePermission">删除</Button>
            </div>
        </Modal>
        <Modal
            v-model="isShowEditMenuMulitLanguageModal"
            title="多语言"
            @on-ok="updateMulitLanguage">
            <Form :model="formMulitLanguage" label-position="right" :label-width="100">
                <FormItem label="代码">
                    <Input v-model="formMulitLanguage.code"></Input>
                </FormItem>
                <FormItem label="名称">
                    <Input v-model="formMulitLanguage.name"></Input>
                </FormItem>
                <FormItem label="菜单名称">
                    <Input v-model="formMulitLanguage.menuName"></Input>
                </FormItem>
                <FormItem label="标题名称">
                    <Input v-model="formMulitLanguage.title"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
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
            isShowRoleModel: false,
            isShowDeletePermissionModel: false,
            isShowEditMenuMulitLanguageModal: false,
            menuTreeData: [],
            value: null,
            formValue: {
                menuCode: null,
                menuName: null,
                layoutModule: 'Main',
                parentMenuCode: null,
                display: 'true',
                title: null,
                path: null,
                icon: null
            },
            formMulitLanguage: {
                code: null,
                name: null,
                menuName: null,
                title: null
            },
            icons: [
                { id: 'md-medical', text: 'md-medical' },
                { id: 'ios-medical-outline', text: 'ios-medical-outline' },
                { id: 'md-megaphone', text: 'md-megaphone' },
                { id: 'ios-microphone', text: 'ios-microphone' },
                { id: 'ios-moon-outline', text: 'ios-moon-outline' },
                { id: 'ios-options', text: 'ios-options' },
                { id: 'ios-navigate-outline', text: 'ios-navigate-outline' },
                { id: 'logo-markdown', text: 'logo-markdown' },
                { id: 'md-no-smoking', text: 'md-no-smoking' },
                { id: 'ios-paper-plane', text: 'ios-paper-plane' }
            ],
            columns12: [{
                title: '代码',
                key: 'menuPermissionCode'
            }, {
                title: '名称',
                key: 'menuPermissionName'
            }, {
                title: '备注',
                key: 'menuPermissionRemark'
            }, {
                title: '操作',
                slot: 'action',
                width: 230,
                align: 'center'
            }],
            data6: [{
                menuPermissionCode: 'display',
                menuPermissionName: '显示页面',
                menuPermissionRemark: ''
            }, {
                menuPermissionCode: 'search',
                menuPermissionName: '搜索',
                menuPermissionRemark: '搜索数据'
            }, {
                menuPermissionCode: 'add',
                menuPermissionName: '添加',
                menuPermissionRemark: '添加数据'
            }, {
                menuPermissionCode: 'edit',
                menuPermissionName: '修改',
                menuPermissionRemark: '修改数据'
            }, {
                menuPermissionCode: 'delete',
                menuPermissionName: '删除',
                menuPermissionRemark: '删除数据'
            }],
            multiLanguageColumns: [{
                title: '语言代码',
                key: 'languageCode'
            }, {
                title: '语言名称',
                key: 'languageName'
            }, {
                title: '菜单名称',
                key: 'menuName'
            }, {
                title: '标题',
                key: 'titile'
            }, {
                title: '操作',
                slot: 'action',
                width: 150,
                align: 'center'
            }],
            multiLanguageDatas: [{
                languageCode: 'zh-CN',
                languageName: '简体中文',
                menuName: '菜单111',
                titile: '菜单--111'
            }, {
                languageCode: 'zh-TW',
                languageName: '繁体中文',
                menuName: '菜单(繁体)111',
                titile: '菜单(繁体)--111'
            }, {
                languageCode: 'en-US',
                languageName: 'engilsh',
                menuName: 'menu111',
                titile: 'menu--111'
            }]
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
    },
    methods: {
        showHasMenuPermissionRoles (row) {
            console.log('--showHasMenuPermissionRoles--')
            console.log(row)
            this.$data.isShowRoleModel = true
        },
        removeMenuPermission (row) {
            console.log('--removeMenuPermission--')
            console.log(row)
            this.$data.isShowDeletePermissionModel = true
        },
        deletePermission () {
            this.$data.isShowDeletePermissionModel = false
            this.$Message.success({
                background: true,
                content: '删除成功'
            })
        },
        editMenuMultiLanguage (row) {
            console.log('--editMenuMultiLanguage--')
            console.log(row)
            this.$data.isShowEditMenuMulitLanguageModal = true
        },
        updateMulitLanguage () {
            this.$Message.success({
                background: true,
                content: '修改成功'
            })
        }
    }
}

</script>
