<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box">
                <el-carousel trigger="click" height="312px">
                  <el-carousel-item v-for="(item,index) in imglist" :key="index">
                    <img :src="item.thumb_path" alt="">
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="goods-spec">
                <h1>{{ goodsinfo.title }}</h1>
                <p class="subtitle">{{ goodsinfo.sub_title }}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{ goodsinfo.goods_no }}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{ goodsinfo.market_price }}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{ goodsinfo.sell_price }}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number 
                          v-model="num" 
                          :min="1" 
                          :max="goodsinfo.stock_quantity" 
                          label="描述文字">
                        </el-input-number>
                      
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{ goodsinfo.stock_quantity }}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <div
                id="tabHead"
                class="tab-head"
                style="position: static; top: 517px; width: 925px;"
              >
                <ul>
                  <li>
                    <a href="javascript:;" @click="index=1" :class="{selected: index==1 }">商品介绍</a>
                  </li>
                  <li>
                    <a href="javascript:;" @click="index=2" :class="{selected: index==2 }">商品评论</a>
                  </li>
                </ul>
              </div>
              <div class="tab-content entry" v-show="index==1"  v-html="goodsinfo.content"></div>
              <div class="tab-content"  v-show="index==2">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          data-type="*10-1000"
                          nullmsg="请填写评论内容！"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          value="提交评论"
                          class="submit"
                          @click='addComment'
                        >
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p
                      v-show='commentlist==[]'
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <li v-for="(item, index) in commentlist" :key="index" >
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.add_time | formatCommentTime}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <div id="pagination" class="digg">
                      <span class="disabled">« 上一页</span>
                      <span class="current">1</span>
                      <span class="disabled">下一页 »</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="(item, index) in hotgoodslist" :key="index">
                    <div class="img-box">
                      <a href="#/site/goodsinfo/90" class>
                        <img :src="item.img_url">
                      </a>
                    </div>
                    <div class="txt-box">
                      <a href="#/site/goodsinfo/90" class>{{ item.title }}</a>
                      <span>{{ item.add_time | formatTime }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: "details",
  data() {
    return {
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      commentlist: [],
      num: 1,
      index: 1,
      pageIndex: 1
    };
  },
  methods: {
    addComment(){
      this.$axios.post(`/site/validate/comment/post/goods/102`)
    }
  },
  created() {
    // console.log(this.$route.params.id);
    const id = this.$route.params.id;
    this.$axios
      .get(`/site/goods/getgoodsinfo/${id}`)
      .then(res => {
        // console.log(res);
        this.goodsinfo = res.data.message.goodsinfo;
        this.hotgoodslist = res.data.message.hotgoodslist;
        this.imglist = res.data.message.imglist;
      });
    
    this.$axios.get(`/site/comment/getbypage/goods/102?pageIndex=${this.pageIndex}&pageSize=5`)
    .then(res=>{
      // console.log(res);
      this.commentlist = res.data.message
    })
  },
  filters: {
    // formatTime(val) {
    //   return moment(val).format(`YYYY年MM月DD日`)
    // },
    formatCommentTime(val){
      return moment(val).format(`YYYY年MM月DD日HH:mm`)
    }
  }
};
</script>

<style>
.pic-box{
  width: 300px;
  padding: 0 50px;
}
.pic-box img{
  width: 100%;
  height: 100%;
}

.pic-box ul li{
  width: 10px;
}
.pic-box ul li button{
  width: 100%;
}

.ql-align-center img {
  width: 100%;
  display: block;
}
</style>
