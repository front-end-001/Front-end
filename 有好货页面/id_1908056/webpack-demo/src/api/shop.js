import { http } from '../util';

export default {

    /**
     * 获取首页推荐数据
     */
    fetchRecommand(){
        return http({url: 'https://static001.geekbang.org/univer/classes/js_dev/data/getRecommendationPageData'})
    },

    /**
     * 获取有趣的点-全部
     */
    fetchInterestingAll(){
        return http({url: 'https://static001.geekbang.org/univer/classes/js_dev/data/getInterestingPageDataTypeAll'});
    },

    /**
     * 获取有趣的点-小惊喜
     */
    fetchInterestingSuprise(){
        return http({url: 'https://static001.geekbang.org/univer/classes/js_dev/data/getInterestingPageDataTypeSuprise'});
    },

    /**
     * 获取有趣的点-想不到
     */
    fetchInterestingUnexpect(){
        return http({url: 'https://static001.geekbang.org/univer/classes/js_dev/data/getInterestingPageDataTypeUnexpect'});
    },

    /**
     * 获取新店
     */
    fetchNew(){
        return http({url: 'https://static001.geekbang.org/univer/classes/js_dev/data/getNewPageData'});
    },
    
}
