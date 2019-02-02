const baseUrl = '/api'

class Service {
    getOrderList(params) { // 订单列表
        return axios.post(
            `${baseUrl}/manage/order/list`,
            params
        )
    }
    searchOrder(params) { // 订单查询
        return axios.post(
            `${baseUrl}/manage/order/search`,
            params
        )
    }
    getCategory(params) { // 获取品类子节点(
        return axios.post(
            `${baseUrl}/manage/category/get_category`,
            params
        )
    }
    addCategory(params) { // 增加节点
        return axios.post(
            `${baseUrl}/manage/category/add_category`,
            params
        )
    }
    setCategoryName(params) { // 修改品类名字
        return axios.post(
            `${baseUrl}/manage/category/set_category_name`,
            params
        )
    }
    login(params) { // 后台管理员登录
        return axios.post(
            `${baseUrl}/manage/user/login`,
            params
        )
    }
    isAdmin() {  //判断是否有权限或是否登陆
        return axios.get(
            `${baseUrl}/manage/user/isAdmin`
        )
    }
    logout() {
        return axios.get(
            `${baseUrl}/manage/user/logout`
        )
    }
    getUsers(params) { // 用户列表
        return axios.post(
            `${baseUrl}/manage/user/list`,
            params
        )
    }
    getProducts(params) { // 产品list
        return axios.post(
            `${baseUrl}/manage/product/list`,
            params
        )
    }
    searchProduct(params) { // 产品搜索
        return axios.post(
            `${baseUrl}/manage/product/search`,
            params
        )
    }
    uploadImg(params) { // 图片上传
        return axios.post(
            `${baseUrl}/manage/product/upload_img`,
            params
        )
    }
    deleteImg(params) {   //删除图片
        return axios.post(
            `${baseUrl}/manage/product/delete_img`,
            params
        )
    }
    getProductDetail(params) { // 产品详情
        return axios.post(
            `${baseUrl}/manage/product/detail`,
            params
        )
    }
    setSaleStatus(params) { // 产品上下架
        return axios.post(
            `${baseUrl}/manage/product/set_sale_status`,
            params
        )
    }
    saveProduct(params) { // 新增OR更新产品
        return axios.post(
            `${baseUrl}/manage/product/save`,
            params
        )
    }
}

export default new Service()