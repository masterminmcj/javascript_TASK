import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import NewsList from '@/components/NewsList'
import Production from '@/components/Production'
import NewPro from '@/components/NewPro';
import NewsDetail from '@/components/NewsDetail';
import ProDetail from '@/components/ProDetail';
import BrandList from '@/components/BrandList';
import SearchList from '@/components/SearchList';
import Contribute from '@/components/Contribute'
import Fn from '../../static/js/comment';


Vue.use(Router);

var router= new Router({
  // mode: 'history',
  base:'/spread/',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta:{
        title:"民航资源网传播-首页"
      }
    },
    {
      path: '/news',
      name: 'NewsList',
      component: NewsList,
      meta:{
        title:"民航资源网传播-资讯列表"
      }
    },
    {
      path: '/cases',
      name: 'Production',
      component: Production,
      meta:{
        title:"民航资源网传播-作品列表"
      }
    },
    {
      path: '/hotNews',
      name: 'NewPro',
      component: NewPro,
      meta:{
        title:"民航资源网传播-新闻列表"
      }
    },
    {
      path: '/news/:id',
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/cases/:id',
      name: 'ProDetail',
      component: ProDetail
    },
    {
      path: '/brandlist/:code',
      name: 'BrandList',
      component: BrandList
    },
    {
      path: '/search',
      name: 'SearchList',
      component: SearchList,
      meta:{
        title:"民航资源网传播"
      }
    },
    {
      path:'/contribute',
      name:'Contribute',
      component: Contribute
    }]
});
router.beforeEach(function (to,from,next){
  var isPC = Fn.judgeDevice();
  if (!isPC) {
    document.title='民航资源网';
    if(to.name=='Home'){
      location.href = 'https://i.carnoc.com/spread/recommend';
      next()
    }
    if(to.name=='ProDetail'){
      location.href = 'https://i.carnoc.com/spread/cases/255/'+to.params.id;
      next()
    }

    if(to.name=='NewsDetail'){
      location.href = 'https://i.carnoc.com/spread/news/257/'+to.params.id;
      next()
    }
    if(to.name=='Production'){
      location.href = 'https://i.carnoc.com/spread/creativity';
      next()
    }

    if(to.name=='NewPro'){
      location.href = 'https://i.carnoc.com/spread/recommend';
      next()
    }
    if(to.name=='SearchList'){
      location.href = 'https://i.carnoc.com/spread/search';
      next()
    }
    if(to.name=='NewsList'){
      location.href = 'https://i.carnoc.com/spread/recommend';
      next()
    }
    if(to.name=='Contribute'){
      location.href = 'http://www.carnoc.com/spread/#/contribute';
      next()
    }
    if(to.name=='BrandList'){
      location.href = 'http://www.carnoc.com/spread/#/brandlist/'+to.params.code;
      next()
    }

  }


  else {
    if(to.meta.title){
      document.title=to.meta.title
    }
    next()
  }


});

export default router;
