import HHImage from "../components/HHImage";
import { Link } from "react-router-dom";
import PostMenuAction from "../components/PostMenuAction";
import Search from "../components/Search";
import Comments from "../components/Comments";
const SignlePostPage = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* 详情 */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl 2xl:text-5xl font-semibold">
            ipsum dolor sit, consectetur adipiscing elit,Ullam modieum aut
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>作者</span>
            <Link className="text-blue-800">张伟杰</Link>
            <span>栏目</span>
            <Link className="text-blue-800">网页设计</Link>
            <span>两天前</span>
          </div>
          <p className="text-gray-500 font-medium">
            晨光熹微，山茶含露而绽，胭脂色花瓣在薄雾中洇开。布谷声催醒梯田，老农扶犁翻起新泥，黝黑土地蒸腾着温润气息。三两幼犬追逐落英，踏碎溪边金铃般的连翘花影。采蕨妇人竹篮渐满，忽闻山那头飘来货郎摇鼓的叮咚。牧羊少年倚着野樱吹叶笛，雪瓣落满青衿。纸鸢牵着童谣扶摇直上，划破瓷青色的天际。
          </p>
        </div>
        <div className="hidden lg:block w-2/5">
          <HHImage
            src="/postImg.jpeg"
            width="600"
            className="rounded-2xl"
          ></HHImage>
        </div>
      </div>
      {/* 内容 */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* 文章 */}
        <div className="lg:text-lg flex-1 flex flex-col gap-6 text-justify">
          <p>
            这是我父亲的背影。那时我在北京读书，寒假回家，正是腊月二十九日。第二天就是除夕了。那天晚上，我和父亲在车站上等车。父亲要我买橘子，我说：“不要买了，明天就有了。”他不听，非要去买。
          </p>
          <p>
            我说道：“爸爸，你走吧。”他望车外看了看，说：“我买几个橘子去。你就在此地，不要走动。”我看那边月台的栅栏外有几个卖东西的等着顾客。走到那边月台，须穿过铁道，须跳下去又爬上去。父亲是一个胖子，走过去自然要费事些。我本来要去的，他不肯，只好让他去。
          </p>
          <p>
            我看见他戴着黑布小帽，穿着黑布大马褂，深青布棉袍，蹒跚地走到铁道边，慢慢探身下去，尚不大难。可是他穿过铁道，要爬上那边月台，就不容易了。他用两手攀着上面，两脚再向上缩；他肥胖的身子向左微倾，显出努力的样子。这时我看见他的背影，我的泪很快地流下来了。
          </p>
          <p>
            我再向外看时，他已抱了朱红的橘子望回走了。过铁道时，他先将橘子散放在地上，自己慢慢爬下，再抱起橘子走。到这边时，我赶紧去搀他。他和我走到车上，将橘子一股脑儿放在我的皮大衣上。于是扑扑衣上的泥土，心里很轻松似的，过一会说：“我走了；到那边来信！”我望着他走出去。
          </p>
          <p>
            他走了几步，回过头看见我，说：“进去吧，里边没人。”等他的背影混入来来往往的人里，再找不着了，我便进来坐下，我的眼泪又来了。
          </p>
          <p>
            我看见他戴着黑布小帽，穿着黑布大马褂，深青布棉袍，蹒跚地走到铁道边，慢慢探身下去，尚不大难。可是他穿过铁道，要爬上那边月台，就不容易了。他用两手攀着上面，两脚再向上缩；他肥胖的身子向左微倾，显出努力的样子。这时我看见他的背影，我的泪很快地流下来了。
          </p>
          <p>
            我再向外看时，他已抱了朱红的橘子望回走了。过铁道时，他先将橘子散放在地上，自己慢慢爬下，再抱起橘子走。到这边时，我赶紧去搀他。他和我走到车上，将橘子一股脑儿放在我的皮大衣上。于是扑扑衣上的泥土，心里很轻松似的，过一会说：“我走了；到那边来信！”我望着他走出去。
          </p>
          <p>
            他走了几步，回过头看见我，说：“进去吧，里边没人。”等他的背影混入来来往往的人里，再找不着了，我便进来坐下，我的眼泪又来了。
          </p>
          <p>
            我看见他戴着黑布小帽，穿着黑布大马褂，深青布棉袍，蹒跚地走到铁道边，慢慢探身下去，尚不大难。可是他穿过铁道，要爬上那边月台，就不容易了。他用两手攀着上面，两脚再向上缩；他肥胖的身子向左微倾，显出努力的样子。这时我看见他的背影，我的泪很快地流下来了。
          </p>
          <p>
            我再向外看时，他已抱了朱红的橘子望回走了。过铁道时，他先将橘子散放在地上，自己慢慢爬下，再抱起橘子走。到这边时，我赶紧去搀他。他和我走到车上，将橘子一股脑儿放在我的皮大衣上。于是扑扑衣上的泥土，心里很轻松似的，过一会说：“我走了；到那边来信！”我望着他走出去。
          </p>
          <p>
            他走了几步，回过头看见我，说：“进去吧，里边没人。”等他的背影混入来来往往的人里，再找不着了，我便进来坐下，我的眼泪又来了。
          </p>
        </div>
        {/* 主页 */}
        <div className="px-2 h-max sticky top-0">
          <h1 className=" mb-4 text-sm font-medium">作者</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              <HHImage
                src="userImg.jpeg"
                className="w-12 h-12 rounded-full object-cover"
                width="48"
                height="48"
              />
              <Link className="text-blue-800">朱自清</Link>
            </div>

            {/* 个人简介 */}
            <p className="text-gray-500 text-sm">
              {" "}
              他走了几步，回过头看见我，{" "}
            </p>
            <div className="flex gap-2 ">
              <Link>
                <HHImage src="facebook.svg" />
              </Link>
              <Link>
                <HHImage src="instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuAction />
          <h1 className="mt-8 mb-4 text-sm font-medium">类别</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="  underline">
              网页设计
            </Link>
            <Link to="/" className="underline">
              前端开发
            </Link>
            <Link to="/" className="underline">
              后端开发
            </Link>

            <Link to="/" className="underline">
              数据科学
            </Link>
            <Link to="/" className="underline">
              人工智能
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">搜索</h1>
          <Search />
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default SignlePostPage;
